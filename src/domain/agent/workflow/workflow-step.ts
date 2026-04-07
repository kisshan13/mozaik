import { WorkflowRun } from "@agent/workflow/workflow-run"

export enum WorkflowStepType {
	BUILD_PROMPT = "build_prompt",
	CALL_MODEL = "call_model",
	PARSE_OUTPUT = "parse_output",
	APPLY_DECISION = "apply_decision",
}

export interface WorkflowStep {
	type: WorkflowStepType
	execute(run: WorkflowRun): Promise<void>
}
