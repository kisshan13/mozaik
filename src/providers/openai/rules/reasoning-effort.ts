import { BaseCondition } from "@core/context-engine/condition/condition"
import { Action, Rule } from "@core/context-engine/rule/rule"
import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { InferenceRequest } from "@core/generative-model/inference-request"

export class ReasoningEffortSupported extends BaseCondition<InferenceRequest> {
	isSatisfiedBy(candidate: InferenceRequest): boolean {
		return candidate.model.capabilities.some((capability) => capability instanceof ReasoningEffort)
	}
}

export class SetReasoningEffort implements Action<InferenceRequest> {
	apply(candidate: InferenceRequest): InferenceRequest {
		const reasoningCapability = candidate.model.capabilities.find(
			(capability) => capability instanceof ReasoningEffort,
		)
		if (reasoningCapability) {
			const providerRequest = candidate.providerRequest
			candidate.providerRequest = {
				...providerRequest,
				reasoning: {
					effort: reasoningCapability.getReasoningEffort(),
				},
			}
		}
		return candidate
	}
}
export const reasoningEffortRule = new Rule({
	when: new ReasoningEffortSupported(),
	then: new SetReasoningEffort(),
})
