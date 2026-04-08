import { BasePolicy } from "src/domain/policy"

export class StreamingPolicy extends BasePolicy {
	isSatisfiedBy(candidate: any): boolean {
		return candidate.delta
	}
}
