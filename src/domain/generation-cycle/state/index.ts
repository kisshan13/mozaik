import { GenerationContext } from "../generation-context"
import { Transition } from "../transition"

export enum StateId {
	CYCLE_START,
	INFERENCE,
	OUTPUT_EXTRACTION,
	OUTPUT_VALIDATION,
	OUTPUT_EXECUTION,
	OUTPUT_REJECTION,
	CYCLE_END,
}

export interface State {
	run(generationContext: GenerationContext): Promise<Transition>
}