import { UserMessage } from "@core/context/input/user-message"
import { FunctionCallHandler, InferenceRequestHandler, ModelMessageHandler, UserMessageHandler } from "./handler"
import { InferenceRequest } from "@core/generative-model/inference-request"
import { Context } from "@core/context/context"
import { GenerativeModel } from "@core/generative-model/generative-model"
import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@core/generative-model/capabilities/tool-calling"
import { InferenceResponse } from "@core/generative-model/inference-response"
import { FunctionCall } from "@core/context/output/function-call"
import { ModelMessage } from "@core/context/output/model-message"

export enum StateId {
	USER_MESSAGE_HANDLER,
	INFERENCE_REQUEST_HANDLER,
	INFERENCE_RESPONSE_HANDLER,
	FUNCTION_CALL_HANDLER,
	FUNCTION_CALL_OUTPUT_HANDLER,
	MODEL_MESSAGE_HANDLER,
}

export enum ExecutionStatus {
	RUNNING,
	COMPLETED,
	FAILED,
}

export interface TransitionRecord {
	fromState: StateId
	toState: StateId
	timestamp: Date
	duration: number
	error: Error | null
}

export class Execution {
	executionId: string
	currentState: StateId
	previousState: StateId | null
	status: ExecutionStatus
	stepCount: number
	retryCounts: Map<StateId, number>
	history: TransitionRecord[]

	constructor(executionId: string) {
		this.executionId = executionId
		this.currentState = StateId.USER_MESSAGE_HANDLER
		this.previousState = null
		this.status = ExecutionStatus.RUNNING
		this.stepCount = 0
		this.retryCounts = new Map<StateId, number>()
		this.history = []
	}

	isTerminal(): boolean {
		return this.status == ExecutionStatus.COMPLETED || this.status == ExecutionStatus.FAILED
	}
}

export interface RuntimeContext {
	execution: Execution
	userMessage: UserMessage
	model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability
	context: Context
	inferenceResponse?: InferenceResponse
	modelMessage?: ModelMessage
}

export interface Transition {
	apply(context: RuntimeContext): Promise<void>
}

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(context: RuntimeContext): Promise<void> {
		const execution = context.execution
		execution.previousState = execution.currentState
		execution.currentState = this.next
		execution.stepCount++
		execution.history.push({
			fromState: execution.previousState,
			toState: execution.currentState,
			timestamp: new Date(),
			duration: 0,
			error: null,
		})
	}
}

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(context: RuntimeContext): Promise<void> {
		const execution = context.execution
		execution.status = ExecutionStatus.COMPLETED
	}
}

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(context: RuntimeContext): Promise<void> {
		const execution = context.execution
		execution.status = ExecutionStatus.FAILED
	}
}

export interface State {
	run(context: RuntimeContext): Promise<Transition>
}

export class UserMessageState implements State {
	id: StateId = StateId.USER_MESSAGE_HANDLER
	handler: UserMessageHandler

	constructor(handler: UserMessageHandler) {
		this.handler = handler
	}

	async run(runtime: RuntimeContext): Promise<Transition> {
		try {
			await this.handler.handle(runtime.execution.executionId, runtime.userMessage)
			return new GoTo(StateId.INFERENCE_REQUEST_HANDLER)
		} catch (error) {
			return new Fail((error as Error).message)
		}
	}
}

export class InferenceRequestState implements State {
	id: StateId = StateId.INFERENCE_REQUEST_HANDLER
	handler: InferenceRequestHandler

	constructor(handler: InferenceRequestHandler) {
		this.handler = handler
	}

	async run(runtime: RuntimeContext): Promise<Transition> {
		try {
			const inferenceRequest = new InferenceRequest(runtime.model, runtime.context)
			const inferenceResponse = await this.handler.handle(runtime.execution.executionId, inferenceRequest)

			if (inferenceResponse instanceof FunctionCall) {
				return new GoTo(StateId.FUNCTION_CALL_HANDLER)
			}
			if (inferenceResponse instanceof ModelMessage) {
				return new GoTo(StateId.MODEL_MESSAGE_HANDLER)
			}
			return new Fail("Invalid response type")
		} catch (error) {
			return new Fail((error as Error).message)
		}
	}
}

export class FunctionCallState implements State {
	id: StateId = StateId.FUNCTION_CALL_HANDLER
	handler: FunctionCallHandler

	constructor(handler: FunctionCallHandler) {
		this.handler = handler
	}
	async run(runtime: RuntimeContext): Promise<Transition> {
		try {
			const functionCall = runtime.inferenceResponse?.contextItems.find(
				(item) => item.getType() === "function_call",
			)
			if (!functionCall) {
				throw new Error("Function call not found")
			}
			const functionCallOutput = await this.handler.handle(
				runtime.execution.executionId,
				functionCall as FunctionCall,
			)
			if (!functionCallOutput) {
				throw new Error("Function call output not found")
			}
			runtime.context.addItem(functionCallOutput)
			return new GoTo(StateId.INFERENCE_REQUEST_HANDLER)
		} catch (error) {
			return new Fail((error as Error).message)
		}
	}
}

export class ModelMessageState implements State {
	id: StateId = StateId.MODEL_MESSAGE_HANDLER
	handler: ModelMessageHandler

	constructor(handler: ModelMessageHandler) {
		this.handler = handler
	}

	async run(runtime: RuntimeContext): Promise<Transition> {
		try {
			if (!runtime.modelMessage) {
				throw new Error("Model message not found")
			}
			await this.handler.handle(runtime.execution.executionId, runtime.modelMessage as ModelMessage)
			return new Complete(runtime.modelMessage.content.text)
		} catch (error) {
			return new Fail((error as Error).message)
		}
	}
}

export class RuntimeEngine {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor(
		userMessageHandler: UserMessageHandler,
		inferenceRequestHandler: InferenceRequestHandler,
		functionCallHandler: FunctionCallHandler,
		modelMessageHandler: ModelMessageHandler,
	) {
		this.states.set(StateId.USER_MESSAGE_HANDLER, new UserMessageState(userMessageHandler))
		this.states.set(StateId.INFERENCE_REQUEST_HANDLER, new InferenceRequestState(inferenceRequestHandler))
		this.states.set(StateId.FUNCTION_CALL_HANDLER, new FunctionCallState(functionCallHandler))
		this.states.set(StateId.MODEL_MESSAGE_HANDLER, new ModelMessageState(modelMessageHandler))
	}

	public async run(execution: Execution, context: RuntimeContext): Promise<void> {
		while (!execution.isTerminal()) {
			const state = this.states.get(execution.currentState)

			if (!state) {
				throw new Error(`State ${execution.currentState} not found`)
			}

			const transition = await state.run(context)

			transition.apply(context)
		}
	}
}
