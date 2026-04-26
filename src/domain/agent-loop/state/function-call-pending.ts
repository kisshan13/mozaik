import { RuntimeContext } from "@domain/agent-loop/loop"
import { State, StateDetails, StateId } from "@domain/agent-loop/state/state"
import { GoTo } from "@domain/agent-loop/transition/go-to"
import { Transition } from "@domain/agent-loop/transition/transition"
import { Fail } from "@domain/agent-loop/transition/fail"
import { HookId } from "@domain/agent-loop/hooks/hook"
import { FunctionCallRequestedSpec } from "@domain/model-context/specifications/function-call-requested"
import { FunctionCallOutputPresentSpec } from "@domain/model-context/specifications/function-call-output-present"

export class FunctionCallPendingState implements State {
	id: StateId = StateId.FUNCTION_CALL_PENDING
	beforeHookId: HookId = HookId.BEFORE_FUNCTION_CALL
	afterHookId: HookId = HookId.AFTER_FUNCTION_CALL

	private functionCallRequestedSpec = new FunctionCallRequestedSpec()
	private functionCallOutputPresentSpec = new FunctionCallOutputPresentSpec()

	getDetails(): StateDetails {
		return {
			before: this.beforeHookId,
			stateId: this.id,
			after: this.afterHookId,
		}
	}

	validateEntry(runtime: RuntimeContext): void {
		if (!this.functionCallRequestedSpec.isSatisfiedBy(runtime.context)) {
			throw new Error("Function call requested not found")
		}
	}

	next(runtime: RuntimeContext): Transition {
		if (!this.functionCallOutputPresentSpec.isSatisfiedBy(runtime.context)) {
			return new Fail("Function call output not found")
		}
		return new GoTo(StateId.INFERENCE_PENDING)
	}
}
