import { HookId } from "@domain/agent-loop/hooks/hook"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { Transition } from "@domain/agent-loop/transition/transition"

export enum StateId {
	INFERENCE_PENDING = "INFERENCE_PENDING",
	FUNCTION_CALL_PENDING = "FUNCTION_CALL_PENDING",
	MODEL_MESSAGE_RECEIVED = "MODEL_MESSAGE_RECEIVED",
}

export type StateDetails = {
	before: HookId
	stateId: StateId
	after: HookId
}

export interface State {
	id: StateId
	beforeHookId: HookId
	afterHookId: HookId
	getDetails(): StateDetails
	validateEntry(context: RuntimeContext): void
	next(context: RuntimeContext): Transition
}
