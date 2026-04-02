import { GoTo, SessionContext, State, StateId, Transition } from "../../session"

export class OutputRejection implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.OUTPUT_EXECUTION)
	}
}
