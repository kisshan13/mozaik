import { GoTo, SessionContext, State, StateId, Transition } from "../state"

export class ContextUpdate implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.INFERENCE)
	}
}
