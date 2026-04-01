import { Session, Inference, ResponseProcessing, ToolExecution, State, StateId, Start } from "./state"

export interface RuntimeContext {
	context: Context
	providerRequest: any | null
	providerResponse: any | null
}

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

	public async run(execution: Execution, context: RuntimeContext): Promise<void> {
		while (!execution.isTerminal()) {
			const state = this.states.get(execution.currentState)

			if (!state) {
				throw new Error(`State ${execution.currentState} not found`)
			}

			const transition = await state.run(execution, context)

			transition.apply(execution, context)
		}
	}
}
