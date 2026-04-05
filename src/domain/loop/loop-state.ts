import { Loop } from "./loop"

export enum StateId {
	LOOP_START,
	INFERENCE,
	COMPLETION_RECEIVED,
	CANDIDATE_MUTATION,
	CANDIDATE_ACCEPTION,
	CANDIDATE_REJECTION,
	LOOP_STOP,
}

export interface LoopState {
	run(loop: Loop): void
}
