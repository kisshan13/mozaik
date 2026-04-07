import { WorkflowExecutionPolicy } from "@agent/workflow/workflow-execution-policy"
import { WorkflowRun, StateId } from "@agent/workflow/workflow-run"
import { WorkflowStepType } from "@agent/workflow/workflow-step"

export class TokenStreamingPolicy implements WorkflowExecutionPolicy {
	next(run: WorkflowRun): WorkflowStepType {
		const current = run.getCurrentState()

		if (current === StateId.INITIALIZED) {
			return WorkflowStepType.BUILD_PROMPT
		}

		if (current === StateId.WAITING_INFERENCE) {
			return WorkflowStepType.CALL_MODEL
		}

		throw new Error(`Invalid transition: ${current}`)
	}
}
