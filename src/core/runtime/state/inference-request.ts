import { InferenceRequest } from "@core/generative-model/inference-request"
import { Fail, GoTo, RuntimeContext, State, StateId, Transition } from "../runtime"
import { ModelMessage } from "@core/context/output/model-message"
import { FunctionCall } from "@core/context/output/function-call"
import { InferenceRequestHandler } from "../handler"

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
