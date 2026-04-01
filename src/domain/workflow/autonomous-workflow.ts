import { SessionContext, State, StateId } from "../session/state"
import { ContextUpdate } from "../session/state/context-update"
import { DecisionMaking } from "../session/state/decision-making"
import { Inference } from "../session/state/inference"
import { OutputInterpretation } from "../session/state/output-interpretation"
import { SessionEnd } from "../session/state/session-end"
import { SessionStart } from "../session/state/session-start"
import { ToolExecution, ToolExecutionAdapter } from "../session/state/tool-execution"
import { Workflow } from "./workflow"

export class AutonomousWorkflow extends Workflow {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor(toolExecutionAdapter: ToolExecutionAdapter) {
		super()
		this.states.set(StateId.SESSION_START, new SessionStart())
		this.states.set(StateId.CONTEXT_UPDATE, new ContextUpdate())
		this.states.set(StateId.INFERENCE, new Inference())
		this.states.set(StateId.OUTPUT_INTERPRETATION, new OutputInterpretation())
		this.states.set(StateId.DECISION_MAKING, new DecisionMaking())
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
