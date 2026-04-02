import { GoTo, SessionContext, State, StateId, Transition } from "../../session"

export class OutputExecution implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.OUTPUT_EXECUTION)
	}
}
