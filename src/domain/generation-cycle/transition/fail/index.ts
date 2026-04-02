import { Transition } from "../"
import { GenerationContext, GenerationStatus } from "../../generation-context"

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.status = GenerationStatus.FAILED
	}
}