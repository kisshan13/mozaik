import { RuntimeContext } from "@domain/agent-loop/loop"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCall } from "@domain/model-context/context-item/model-item/function-call"
import { State, StateHooks, StateId } from "@domain/agent-loop/state/state"
import { GoTo } from "@domain/agent-loop/transition/go-to"
import { Fail } from "@domain/agent-loop/transition/fail"
import { Transition } from "@domain/agent-loop/transition/transition"
import { HookId } from "@domain/agent-loop/hooks/hook"

export class InferencePendingState implements State {
	id: StateId = StateId.INFERENCE_PENDING

	entry(runtime: RuntimeContext): StateHooks {
		const inferenceRequest = runtime.inferenceRequest
		if (!inferenceRequest) {
			throw new Error("Inference request not found")
		}
		return {
			before: HookId.BEFORE_INFERENCE,
			after: HookId.AFTER_INFERENCE,
		}
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
