import { SessionContext, State, StateId } from "./state"
import { ContextUpdate } from "./state/context-update"
import { Decide } from "./state/decide"
import { Inference } from "./state/inference"
import { ResponseProcessing } from "./state/response-processing"
import { SessionEnd } from "./state/session-end"
import { SessionStart } from "./state/session-start"
import { ToolExecution, ToolExecutionAdapter } from "./state/tool-execution"

export class AgentSession {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor(toolExecutionAdapter: ToolExecutionAdapter) {
		this.states.set(StateId.SESSION_START, new SessionStart())
		this.states.set(StateId.CONTEXT_UPDATE, new ContextUpdate())
		this.states.set(StateId.INFERENCE, new Inference())
		this.states.set(StateId.RESPONSE_PROCESSING, new ResponseProcessing())
		this.states.set(StateId.DECIDE, new Decide())
		this.states.set(StateId.TOOL_EXECUTION, new ToolExecution(toolExecutionAdapter))
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
