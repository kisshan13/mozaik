import { Loop } from "./loop"

export enum StateId {
	INITIALIZED = "initialized",
	LOOP_START = "loop_start",
	INFERENCE = "inference",
	COMPLETION_RECEIVED = "completion_received",
	CANDIDATE_MUTATION = "candidate_mutation",
	CANDIDATE_ACCEPTION = "candidate_acception",
	CANDIDATE_REJECTION = "candidate_rejection",
	LOOP_STOP = "loop_stop",
}

export interface LoopState {
	run(loop: Loop): void
}
