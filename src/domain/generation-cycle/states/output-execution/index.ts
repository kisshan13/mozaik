import { GoTo, GenerationContext, State, StateId, Transition } from "../../generation-context"

export class OutputExecution implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		return new GoTo(StateId.OUTPUT_EXECUTION)
	}
}
