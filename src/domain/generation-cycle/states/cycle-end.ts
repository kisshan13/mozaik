import { GenerationContext } from "@generation-cycle/generation-context"
import { GoTo } from "@generation-cycle/transitions/go-to"
import { StateId } from "@generation-cycle/state"
import { Transition } from "@generation-cycle/transition"
import { State } from "@generation-cycle/state"

export class CycleEnd implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		return new GoTo(StateId.INFERENCE)
	}
}
