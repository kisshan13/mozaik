import { Session, Inference, ResponseProcessing, ToolExecution, State, StateId, Start } from "./state"

export class RuntimeEngine {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor() {
		this.states.set(StateId.LOOP_START, new LoopStart())
		this.states.set(StateId.CONTEXT_UPDATE, new ContextUpdate())
		this.states.set(StateId.INFERENCE, new Inference())
		this.states.set(StateId.RESPONSE_PROCESSING, new ResponseProcessing())
		this.states.set(StateId.DECIDE, new Decide())
		this.states.set(StateId.TOOL_EXECUTION, new ToolExecution())
		this.states.set(StateId.LOOP_END, new LoopEnd())
	}

	public async run(session: Session): Promise<void> {
		while (!session.isTerminal()) {
			const state = this.states.get(session.currentState)

			if (!state) {
				throw new Error(`State ${session.currentState} not found`)
			}

			const transition = await state.run(session)

			transition.apply(session)
		}
	}
}
