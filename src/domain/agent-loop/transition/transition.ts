import { RuntimeContext } from "@domain/agent-loop/loop"
import { StateId } from "@domain/agent-loop/state/state"

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
