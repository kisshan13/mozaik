import { GoTo, SessionContext, State, StateId, Transition } from "../../session"

export class CycleEnd implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.CONTEXT_CONSTRUCTION)
	}
}
