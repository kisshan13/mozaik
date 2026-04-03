import { Transition } from "@generation-cycle/transition"
import { GenerationContext } from "@generation-cycle/generation-context"
import { StateId } from "@generation-cycle/state"

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
