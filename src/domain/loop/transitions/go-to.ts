import { Transition } from "src/domain/loop/transition"
import { LoopContext } from "src/domain/loop/loop-context"
import { StateId } from "src/domain/loop/loop-state"

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(loopContext: LoopContext): Promise<void> {
		loopContext.previousState = loopContext.currentState
		loopContext.currentState = this.next
	}
}
