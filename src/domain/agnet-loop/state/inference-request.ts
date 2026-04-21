import { RuntimeContext } from "../loop"
import { ModelMessage } from "src/domain/context/output/model-message"
import { FunctionCall } from "src/domain/context/output/function-call"
import { State, StateId } from "./state"
import { GoTo } from "../transition/go-to"
import { Fail } from "../transition/fail"
import { Transition } from "../transition/transition"

export class InferencePendingState implements State {
	id: StateId = StateId.INFERENCE_PENDING

	next(runtime: RuntimeContext): Transition {
		const inferenceResponse = runtime.inferenceResponse
		if (!inferenceResponse) {
			return new Fail("Inference response not found")
		}
		if (inferenceResponse instanceof FunctionCall) {
			return new GoTo(StateId.FUNCTION_CALL_PENDING)
		}
		if (inferenceResponse instanceof ModelMessage) {
			return new GoTo(StateId.MODEL_MESSAGE_RECEIVED)
		}
		return new Fail("Invalid response type")
	}
}
