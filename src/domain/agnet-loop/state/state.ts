import { RuntimeContext } from "../loop"
import { Transition } from "../transition/transition"

export enum StateId {
	USER_MESSAGE_RECEIVED = "USER_MESSAGE_RECEIVED",
	INFERENCE_PENDING = "INFERENCE_PENDING",
	FUNCTION_CALL_PENDING = "FUNCTION_CALL_PENDING",
	MODEL_MESSAGE_RECEIVED = "MODEL_MESSAGE_RECEIVED",
}

export interface State {
	next(context: RuntimeContext): Transition
}
