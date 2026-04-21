import { RuntimeContext } from "../loop"
import { State, StateId } from "./state"
import { GoTo } from "../transition/go-to"
import { Transition } from "../transition/transition"

export class UserMessageState implements State {
	id: StateId = StateId.USER_MESSAGE_RECEIVED

	next(runtime: RuntimeContext): Transition {
		return new GoTo(StateId.INFERENCE_PENDING)
	}
}
