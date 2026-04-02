import { GoTo, SessionContext, State, StateId, Transition } from "../state"

export class Inference implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.TOOL_EXECUTION)
	}
}
