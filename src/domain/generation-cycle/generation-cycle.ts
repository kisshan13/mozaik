import { SessionContext, State, StateId } from "./session"
import { ContextConstruction } from "./states/context-construction"
import { Inference } from "./states/inference"
import { CycleEnd } from "./states/cycle-end"
import { GenerationCycleStart } from "./states/cycle-start"
import { OutputValidation } from "./states/output-validation"
import { OutputExtraction } from "./states/output-extraction"
import { OutputExecution } from "./states/output-execution"
import { OutputRejection } from "./states/output-rejection"

export class GenerationCycle {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor() {
		this.states.set(StateId.CYCLE_START, new GenerationCycleStart())
		this.states.set(StateId.CONTEXT_CONSTRUCTION, new ContextConstruction())
		this.states.set(StateId.INFERENCE, new Inference())
		this.states.set(StateId.OUTPUT_EXTRACTION, new OutputExtraction())
		this.states.set(StateId.OUTPUT_VALIDATION, new OutputValidation())
		this.states.set(StateId.OUTPUT_EXECUTION, new OutputExecution())
		this.states.set(StateId.OUTPUT_REJECTION, new OutputRejection())
		this.states.set(StateId.CYCLE_END, new CycleEnd())
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
