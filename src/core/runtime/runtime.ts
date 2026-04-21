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
import { FunctionCallState } from "./state/function-call"
import { ModelMessageState } from "./state/model-message"
import { InferenceRequestState } from "./state/inference-request"
import { UserMessageState } from "./state/user-message"

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

export class AgentRuntime {
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
