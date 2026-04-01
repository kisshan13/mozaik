import { GoTo, SessionContext, State, StateId, Transition } from "../state"

export class SessionStart implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.CONTEXT_UPDATE)
	}
}
