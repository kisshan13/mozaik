import { GenerationContext } from "../generation-context"

export interface Transition {
	apply(generationContext: GenerationContext): Promise<void>
}