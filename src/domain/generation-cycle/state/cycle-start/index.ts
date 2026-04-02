import { GoTo, GenerationContext, State, StateId, Transition, GenerationStatus } from "../../generation-context"

export class CycleStart implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		generationContext.status = GenerationStatus.RUNNING
		return new GoTo(StateId.INFERENCE)
	}
}
