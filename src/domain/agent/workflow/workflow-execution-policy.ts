import { WorkflowRun } from "./workflow-run"
import { WorkflowStepType } from "./workflow-step"

export enum ExecutionSignal {
	EXECUTION_STARTED = "execution_started",
	INFERENCE_STARTED = "inference_started",
	INFERENCE_COMPLETED = "inference_completed",
	CANDIDATE_MUTATED = "candidate_mutated",
	CANDIDATE_ACCEPTED = "candidate_accepted",
	CANDIDATE_REJECTED = "candidate_rejected",
	STREAM_OPENED = "stream_opened",
}

export interface WorkflowExecutionPolicy {
	next(run: WorkflowRun): WorkflowStepType
}
