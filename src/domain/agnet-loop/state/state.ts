import { RuntimeContext } from "../loop"
import { Transition } from "../transition/transition"

export enum StateId {
	USER_MESSAGE_HANDLER,
	INFERENCE_REQUEST_HANDLER,
	FUNCTION_CALL_HANDLER,
	MODEL_MESSAGE_HANDLER,
}

export interface State {
	run(context: RuntimeContext): Promise<Transition>
}
