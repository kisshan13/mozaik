import { BasePolicy } from "src/domain/context-engine/condition/condition"

export class StreamingPolicy extends BasePolicy {
	isSatisfiedBy(candidate: any): boolean {
		return candidate.delta
	}
}
