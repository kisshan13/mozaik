import { RuntimeContext } from "@domain/agnet-loop/loop"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCall } from "@domain/model-context/context-item/model-item/function-call"
import { State, StateId } from "@domain/agnet-loop/state/state"
import { GoTo } from "@domain/agnet-loop/transition/go-to"
import { Fail } from "@domain/agnet-loop/transition/fail"
import { Transition } from "@domain/agnet-loop/transition/transition"
import { HookId } from "@app/agent-runtime/hooks-registry"

export class InferencePendingState implements State {
	id: StateId = StateId.INFERENCE_PENDING

	entry(runtime: RuntimeContext): HookId | undefined {
		const inferenceRequest = runtime.inferenceRequest
		if (!inferenceRequest) {
			throw new Error("Inference request not found")
		}
		return HookId.BEFORE_INFERENCE
	}

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
