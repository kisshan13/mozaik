import { Loop } from "../loop"
import { StepId } from "./step"

export enum LoopSignal {
	STARTED = "started",
	INFERENCE_STARTED = "inference_started",
	INFERENCE_COMPLETED = "inference_completed",
	CANDIDATE_MUTATED = "candidate_mutated",
	CANDIDATE_ACCEPTED = "candidate_accepted",
	CANDIDATE_REJECTED = "candidate_rejected",
	STREAM_OPENED = "stream_opened",
}

export interface LoopExecutionOrchestrator {
	next(loop: Loop, signal: LoopSignal): StepId
}
