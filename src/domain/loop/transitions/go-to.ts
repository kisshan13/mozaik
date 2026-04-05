import { Transition } from "src/domain/loop/transition"
import { GenerationContext } from "src/domain/loop/loop-context"
import { StateId } from "src/domain/loop/loop-state"

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.previousState = generationContext.currentState
		generationContext.currentState = this.next
	}
}
