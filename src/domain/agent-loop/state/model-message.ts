import { HookId } from "@domain/agent-loop/hooks/hook"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { State, StateDetails, StateId } from "@domain/agent-loop/state/state"
import { Complete } from "@domain/agent-loop/transition/complete"
import { Fail } from "@domain/agent-loop/transition/fail"
import { Transition } from "@domain/agent-loop/transition/transition"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { ModelRespondedSpecification } from "@domain/model-context/specifications/model-responded"

export class ModelMessageState implements State {
	id: StateId = StateId.MODEL_MESSAGE_RECEIVED
	beforeHookId: HookId = HookId.BEFORE_MODEL_MESSAGE
	afterHookId: HookId = HookId.AFTER_MODEL_MESSAGE

	private modelResponded = new ModelRespondedSpecification()

	getDetails(): StateDetails {
		return {
			before: this.beforeHookId,
			stateId: this.id,
			after: this.afterHookId,
		}
	}

	validateEntry(runtime: RuntimeContext): void {
		if (!this.modelResponded.isSatisfiedBy(runtime.context)) {
			throw new Error("Model message is not present in the context")
		}
	}

	next(runtime: RuntimeContext): Transition {
		if (!this.modelResponded.isSatisfiedBy(runtime.context)) {
			return new Fail("Model message is not present in the context")
		}
		const lastItem = runtime.context.getLastItem() as ModelMessage
		return new Complete(lastItem.content.text)
	}
}
