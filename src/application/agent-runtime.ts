import { WorkflowRun, TokenDeliveryMode } from "@agent/workflow/workflow-run"
import { TokenBufferingPolicy } from "@agent/workflow/policies/token-buffering-policy"
import { TokenStreamingPolicy } from "@agent/workflow/policies/token-streaming-policy"

export class AgentRuntime {
	start(run: WorkflowRun): void {
		const tokenDeliveryMode = run.getTokenDeliveryMode()
		if (tokenDeliveryMode === TokenDeliveryMode.BUFFERING) {
			const stepId = new TokenBufferingPolicy().next(run)
		}
		if (tokenDeliveryMode === TokenDeliveryMode.STREAMING) {
			const stepId = new TokenStreamingPolicy().next(run)
		}
		throw new Error(`Invalid token delivery mode: ${tokenDeliveryMode}`)
	}
}
