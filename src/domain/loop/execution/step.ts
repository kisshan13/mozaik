import { Loop } from "@loop/loop"

export enum StepId {
	CONTEXT_PREPARATION = "context_preparation",
	INFERENCE_REQUEST = "inference_request",
	CANDIDATE_MUTATION = "candidate_mutation",
	CANDIDATE_ACCEPTION = "candidate_acception",
	CANDIDATE_REJECTION = "candidate_rejection",
	STREAM_OPEN = "stream_open",
}

export interface LoopExecutionStepHandler {
	id: StepId
	handle(loop: Loop): Promise<void>
}
