import { Transition } from "@generation-cycle/transition"
import { GenerationContext, GenerationStatus } from "@generation-cycle/generation-context"

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.status = GenerationStatus.COMPLETED
	}
}
