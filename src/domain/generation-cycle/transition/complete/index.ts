import { Transition } from "../"
import { GenerationContext, GenerationStatus } from "../../generation-context"

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.status = GenerationStatus.COMPLETED
	}
}