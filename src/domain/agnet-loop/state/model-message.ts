import { RuntimeContext } from "@domain/agnet-loop/loop"
import { State, StateId } from "@domain/agnet-loop/state/state"
import { Complete } from "@domain/agnet-loop/transition/complete"
import { Fail } from "@domain/agnet-loop/transition/fail"
import { Transition } from "@domain/agnet-loop/transition/transition"

export class ModelMessageState implements State {
	id: StateId = StateId.MODEL_MESSAGE_RECEIVED

	next(runtime: RuntimeContext): Transition {
		if (!runtime.modelMessage) {
			return new Fail("Model message not found")
		}
		return new Complete(runtime.modelMessage.content.text)
	}
}
