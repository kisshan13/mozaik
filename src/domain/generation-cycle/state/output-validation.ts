import { GoTo, SessionContext, State, StateId, Transition } from "../state"

export class OutputValidation implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		return new GoTo(StateId.OUTPUT_EXECUTION)
	}
}
