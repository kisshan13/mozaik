import { Transition } from "../"
import { GenerationContext } from "../../generation-context"
import { StateId } from "../../state"

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