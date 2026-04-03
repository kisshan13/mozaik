import { GenerationContext } from "@generation-cycle/generation-context"
import { StateId } from "@generation-cycle/state"
import { Transition } from "@generation-cycle/transition"
import { State } from "@generation-cycle/state"
import { GoTo } from "@generation-cycle/transition/go-to"

export class GenerationCycleEnd implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		return new GoTo(StateId.CYCLE_END)
	}
}
