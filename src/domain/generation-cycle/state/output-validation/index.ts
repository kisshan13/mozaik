import { GenerationContext } from "../../generation-context"
import { GoTo } from "../../transition/go-to"
import { StateId } from "../../state"
import { Transition } from "../../transition"
import { State } from "../../state"

export class OutputValidation implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		return new GoTo(StateId.OUTPUT_EXECUTION)
	}
}
