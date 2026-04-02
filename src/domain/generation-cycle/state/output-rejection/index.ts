import { GenerationContext, GenerationStatus } from "../../generation-context"
import { GoTo } from "../../transition/go-to"
import { StateId } from "../../state"
import { Transition } from "../../transition"
import { State } from "../../state"

export class OutputRejection implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		generationContext.status = GenerationStatus.FAILED
		return new GoTo(StateId.CYCLE_END)
	}
}
