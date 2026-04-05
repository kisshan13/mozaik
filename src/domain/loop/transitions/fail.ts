import { Transition } from "src/domain/loop/transition"
import { GenerationContext, GenerationStatus } from "src/domain/loop/loop-context"

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.status = GenerationStatus.FAILED
	}
}
