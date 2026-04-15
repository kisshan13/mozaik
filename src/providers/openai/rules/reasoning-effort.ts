import { BaseCondition } from "@core/context-engine/condition/base-condition"
import { Action, Rule } from "@core/context-engine/rule/rule"
import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { InferenceRequest } from "@core/generative-model/inference-request"

export class ReasoningEffortSupported extends BaseCondition<InferenceRequest> {
	isSatisfiedBy(candidate: InferenceRequest): boolean {
		return candidate.model.capabilities.some((capability) => capability instanceof ReasoningEffort)
	}
}

export class GetReasoningEffort implements Action<InferenceRequest, "low" | "medium" | "high" | "xhigh" | "none"> {
	apply(candidate: InferenceRequest): "low" | "medium" | "high" | "xhigh" | "none" {
		const reasoningCapability = candidate.model.capabilities.find((capability) => capability instanceof ReasoningEffort)
		if (reasoningCapability) {
			return reasoningCapability.getReasoningEffort()
		}
		throw new Error("Reasoning capability not supported")
	}
}
export const reasoningEffortRule = new Rule({
	when: new ReasoningEffortSupported(),
	then: new GetReasoningEffort(),
})