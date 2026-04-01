import { GoTo, SessionContext, State, StateId, Transition } from "../state"

export class ResponseProcessing implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.TOOL_EXECUTION)
	}
}
