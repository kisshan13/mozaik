import { GenerationContext } from "./generation-context"
import { Inference } from "./state/inference"
import { CycleEnd } from "./state/cycle-end"
import { CycleStart } from "./state/cycle-start"
import { OutputValidation } from "./state/output-validation"
import { OutputExtraction } from "./state/output-extraction"
import { OutputExecution } from "./state/output-execution"
import { OutputRejection } from "./state/output-rejection"
import { State, StateId } from "./state"

export class GenerationCycle {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor() {
		this.states.set(StateId.CYCLE_START, new CycleStart())
		this.states.set(StateId.INFERENCE, new Inference())
		this.states.set(StateId.OUTPUT_EXTRACTION, new OutputExtraction())
		this.states.set(StateId.OUTPUT_VALIDATION, new OutputValidation())
		this.states.set(StateId.OUTPUT_EXECUTION, new OutputExecution())
		this.states.set(StateId.OUTPUT_REJECTION, new OutputRejection())
		this.states.set(StateId.CYCLE_END, new CycleEnd())
	}

	public async start(generationContext: GenerationContext): Promise<void> {
		while (!generationContext.isTerminal()) {
			const state = this.states.get(generationContext.currentState)

			if (!state) {
				throw new Error(`State ${generationContext.currentState} not found`)
			}

			const transition = await state.run(generationContext)

			transition.apply(generationContext)
		}
	}
}
