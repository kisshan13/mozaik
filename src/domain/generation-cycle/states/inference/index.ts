import { GoTo, SessionContext, State, StateId, Transition } from "../../session"

export class Inference implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.OUTPUT_EXTRACTION)
	}
}
