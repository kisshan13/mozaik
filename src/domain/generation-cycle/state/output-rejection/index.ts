import { GenerationContext, GenerationStatus } from "@generation-cycle/generation-context"
import { GoTo } from "@generation-cycle/transition/go-to"
import { StateId } from "@generation-cycle/state"
import { Transition } from "@generation-cycle/transition"
import { State } from "@generation-cycle/state"

export class OutputRejection implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		generationContext.status = GenerationStatus.FAILED
		return new GoTo(StateId.CYCLE_END)
	}
}
