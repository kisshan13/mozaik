import { RuntimeContext } from "../loop"
import { StateId } from "../state/state"

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
