import { RuntimeContext } from "../loop"
import { State, StateId } from "./state"
import { Complete } from "../transition/complete"
import { Fail } from "../transition/fail"
import { Transition } from "../transition/transition"

export class ModelMessageState implements State {
	id: StateId = StateId.MODEL_MESSAGE_RECEIVED

	next(runtime: RuntimeContext): Transition {
		if (!runtime.modelMessage) {
			return new Fail("Model message not found")
		}
		return new Complete(runtime.modelMessage.content.text)
	}
}
