import { HookId } from "@app/agent-runtime/hooks-registry"
import { RuntimeContext } from "@domain/agnet-loop/loop"
import { State, StateId } from "@domain/agnet-loop/state/state"
import { GoTo } from "@domain/agnet-loop/transition/go-to"
import { Transition } from "@domain/agnet-loop/transition/transition"

export class UserMessageState implements State {
	id: StateId = StateId.USER_MESSAGE_RECEIVED

	entry(runtime: RuntimeContext): HookId | undefined {
		return HookId.ON_USER_MESSAGE_RECEIVED
	}

	next(runtime: RuntimeContext): Transition {
		return new GoTo(StateId.INFERENCE_PENDING)
	}
}
