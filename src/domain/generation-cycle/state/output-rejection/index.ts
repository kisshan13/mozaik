import { GoTo, GenerationContext, State, StateId, Transition, GenerationStatus } from "../../generation-context"

export class OutputRejection implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		generationContext.status = GenerationStatus.FAILED
		return new GoTo(StateId.CYCLE_END)
	}
}
