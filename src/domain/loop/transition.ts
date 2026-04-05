import { GenerationContext } from "src/domain/loop/loop-context"

export interface Transition {
	apply(generationContext: GenerationContext): Promise<void>
}
