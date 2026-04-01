import { SessionContext, Inference, ResponseProcessing, ToolExecution, State, StateId, SessionStart } from "./state"

export class AgentSession {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor() {
		this.states.set(StateId.SESSION_START, new SessionStart())
		this.states.set(StateId.CONTEXT_UPDATE, new ContextUpdate())
		this.states.set(StateId.INFERENCE, new Inference())
		this.states.set(StateId.RESPONSE_PROCESSING, new ResponseProcessing())
		this.states.set(StateId.DECIDE, new Decide())
		this.states.set(StateId.TOOL_EXECUTION, new ToolExecution())
		this.states.set(StateId.SESSION_END, new SessionEnd())
	}

	public async start(sessionContext: SessionContext): Promise<void> {
		while (!sessionContext.isTerminal()) {
			const state = this.states.get(sessionContext.currentState)

			if (!state) {
				throw new Error(`State ${sessionContext.currentState} not found`)
			}

			const transition = await state.run(sessionContext)

			transition.apply(sessionContext)
		}
	}
}
