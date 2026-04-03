import { GenerationContext } from "@generation-cycle/generation-context"

export interface Transition {
	apply(generationContext: GenerationContext): Promise<void>
}
