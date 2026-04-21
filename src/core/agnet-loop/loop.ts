import { UserMessage } from "@core/context/input/user-message"
import { StateId } from "./state/state"
import { Context } from "@core/context/context"
import { GenerativeModel } from "@core/generative-model/generative-model"
import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@core/generative-model/capabilities/tool-calling"
import { InferenceResponse } from "@core/generative-model/inference-response"
import { ModelMessage } from "@core/context/output/model-message"
import { State } from "./state/state"
import { Execution } from "./execution"

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
		userMessageState: State,
		inferenceRequestState: State,
		functionCallState: State,
		modelMessageState: State,
	) {
		this.states.set(StateId.USER_MESSAGE_HANDLER, userMessageState)
		this.states.set(StateId.INFERENCE_REQUEST_HANDLER, inferenceRequestState)
		this.states.set(StateId.FUNCTION_CALL_HANDLER, functionCallState)
		this.states.set(StateId.MODEL_MESSAGE_HANDLER, modelMessageState)
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
