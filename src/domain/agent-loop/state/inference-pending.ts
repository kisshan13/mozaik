import { RuntimeContext } from "@domain/agent-loop/loop"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { State, StateDetails, StateId } from "@domain/agent-loop/state/state"
import { GoTo } from "@domain/agent-loop/transition/go-to"
import { Fail } from "@domain/agent-loop/transition/fail"
import { Transition } from "@domain/agent-loop/transition/transition"
import { HookId } from "@domain/agent-loop/hooks/hook"
import { FunctionCallRequestedSpecification } from "@domain/model-context/specifications/function-call-requested"
import { ModelRespondedSpecification } from "@domain/model-context/specifications/model-responded"

export class InferencePendingState implements State {
	id: StateId = StateId.INFERENCE_PENDING
	beforeHookId: HookId = HookId.BEFORE_INFERENCE
	afterHookId: HookId = HookId.AFTER_INFERENCE

	private functionCallRequested = new FunctionCallRequestedSpecification()
	private modelResponded = new ModelRespondedSpecification()

	getDetails(): StateDetails {
		return {
			before: this.beforeHookId,
			stateId: this.id,
			after: this.afterHookId,
		}
	}

	validateEntry(runtime: RuntimeContext): void {}

	next(runtime: RuntimeContext): Transition {
		if (this.functionCallRequested.isSatisfiedBy(runtime.context)) {
			return new GoTo(StateId.FUNCTION_CALL_PENDING)
		} else if (this.modelResponded.isSatisfiedBy(runtime.context)) {
			return new GoTo(StateId.MODEL_MESSAGE_RECEIVED)
		}
		return new Fail("Invalid response type")
	}
}
