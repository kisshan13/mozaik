import { BasePolicy } from "src/domain/context-engine/condition/condition"

export class MaxTokensPolicy extends BasePolicy {
	isSatisfiedBy(candidate: any): boolean {
		const maxT = candidate.max_output_tokens as number
		return maxT > 1000
	}
}
