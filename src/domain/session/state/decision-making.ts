import { GoTo, SessionContext, State, StateId, Transition } from "../state"

export class DecisionMaking implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.CONTEXT_CONSTRUCTION)
	}
}
