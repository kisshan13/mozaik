import { WorkflowRun } from "@agent/workflow/workflow-run"
import { WorkflowExecutionPolicy } from "@agent/workflow/workflow-execution-policy"
import { WorkflowStepType } from "@agent/workflow/workflow-step"

export class TokenBufferingPolicy implements WorkflowExecutionPolicy {
	next(run: WorkflowRun): WorkflowStepType {
		return WorkflowStepType.BUILD_PROMPT
	}
}
