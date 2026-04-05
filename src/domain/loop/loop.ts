import { LoopContext } from "./loop-context"
import { LoopState, StateId } from "./loop-state"
import { CompletionReceived } from "./states/completion-received"
import { Inference } from "./states/inference"
import { LoopStop } from "./states/loop-stop"
import { LoopStart } from "./states/loop-start"
import { CandidateRejection } from "./states/candidate-rejection"
import { CandidateMutation } from "./states/candidate-mutation"
import { CandidateAcception } from "./states/candidate-acception"

export class Loop {
	private states: Map<StateId, LoopState> = new Map<StateId, LoopState>()

	constructor() {
		this.states.set(StateId.LOOP_START, new LoopStart())
		this.states.set(StateId.INFERENCE, new Inference())
		this.states.set(StateId.COMPLETION_RECEIVED, new CompletionReceived())
		this.states.set(StateId.CANDIDATE_MUTATION, new CandidateMutation())
		this.states.set(StateId.CANDIDATE_ACCEPTION, new CandidateAcception())
		this.states.set(StateId.CANDIDATE_REJECTION, new CandidateRejection())
		this.states.set(StateId.LOOP_STOP, new LoopStop())
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
