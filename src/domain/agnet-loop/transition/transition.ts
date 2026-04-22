import { RuntimeContext } from "@domain/agnet-loop/loop"
import { StateId } from "@domain/agnet-loop/state/state"

export interface TransitionRecord {
	fromState: StateId
	toState: StateId
	timestamp: Date
	duration: number
	error: Error | null
}

export interface Transition {
	apply(runtime: RuntimeContext): void
}
