import { RuntimeContext } from "../runtime"
import { StateId } from "../state/state"
import { Transition } from "./transition"

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(context: RuntimeContext): Promise<void> {
		const execution = context.execution
		execution.previousState = execution.currentState
		execution.currentState = this.next
		execution.stepCount++
		execution.history.push({
			fromState: execution.previousState,
			toState: execution.currentState,
			timestamp: new Date(),
			duration: 0,
			error: null,
		})
	}
}
