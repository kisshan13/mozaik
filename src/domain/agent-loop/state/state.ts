import { HookId } from "@app/agent-runtime/hooks-registry"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { Transition } from "@domain/agent-loop/transition/transition"

export enum StateId {
	USER_MESSAGE_RECEIVED = "USER_MESSAGE_RECEIVED",
	INFERENCE_PENDING = "INFERENCE_PENDING",
	FUNCTION_CALL_PENDING = "FUNCTION_CALL_PENDING",
	MODEL_MESSAGE_RECEIVED = "MODEL_MESSAGE_RECEIVED",
}

export interface State {
	entry(context: RuntimeContext): HookId | undefined
	next(context: RuntimeContext): Transition
}
