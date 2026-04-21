import { UserMessage } from "@core/context/input/user-message"
import { FunctionCallHandler, InferenceRequestHandler, ModelMessageHandler, UserMessageHandler } from "./handler"
import { StateId } from "./state/state"
import { Context } from "@core/context/context"
import { GenerativeModel } from "@core/generative-model/generative-model"
import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@core/generative-model/capabilities/tool-calling"
import { InferenceResponse } from "@core/generative-model/inference-response"
import { ModelMessage } from "@core/context/output/model-message"
import { FunctionCallState } from "./state/function-call"
import { ModelMessageState } from "./state/model-message"
import { InferenceRequestState } from "./state/inference-request"
import { UserMessageState } from "./state/user-message"
import { State } from "./state/state"
import { TransitionRecord } from "./transition/transition"

export enum ExecutionStatus {
	RUNNING,
	COMPLETED,
	FAILED,
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
