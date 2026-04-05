import { LoopContext } from "./loop-context"
import { LoopState, StateId } from "./loop-state"
import { CompletionReceived } from "./states/completion-received"
import { Inference } from "./states/inference"
import { LoopStop } from "./states/loop-stop"
import { LoopStart } from "./states/loop-start"

export class Loop {
	private states: Map<StateId, LoopState> = new Map<StateId, LoopState>()

	constructor() {
		this.states.set(StateId.LOOP_START, new LoopStart())
		this.states.set(StateId.INFERENCE, new Inference())
		this.states.set(StateId.COMPLETION_RECEIVED, new CompletionReceived())
		this.states.set(StateId.LOOP_END, new LoopStop())
	}

	public async start(loopContext: LoopContext): Promise<void> {
		while (!loopContext.isTerminated()) {
			const state = this.states.get(loopContext.currentState)

			if (!state) {
				throw new Error(`State ${loopContext.currentState} not found`)
			}

			const transition = await state.run(loopContext)

			transition.apply(loopContext)
		}
	}
}
