import { GoTo, SessionContext, State, StateId, Transition } from "../../session"

export class ContextConstruction implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.INFERENCE)
	}
}
