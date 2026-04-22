import { RuntimeContext } from "@domain/agnet-loop/loop"
import { StateId } from "@domain/agnet-loop/state/state"
import { Transition } from "@domain/agnet-loop/transition/transition"

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(context: RuntimeContext): Promise<void> {
		const execution = context.execution
		execution.previousStateId = execution.currentStateId
		execution.currentStateId = this.next
		execution.stepCount++
		execution.history.push({
			fromState: execution.previousStateId,
			toState: execution.currentStateId,
			timestamp: new Date(),
			duration: 0,
			error: null,
		})
	}
}
