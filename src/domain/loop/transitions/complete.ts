import { Transition } from "src/domain/loop/transition"
import { GenerationContext, GenerationStatus } from "src/domain/loop/loop-context"

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.status = GenerationStatus.COMPLETED
	}
}
