import { BaseCondition } from "src/domain/context-engine/condition/base-condition"

export class StreamingPolicy extends BaseCondition<any> {
	isSatisfiedBy(candidate: any): boolean {
		return candidate.delta
	}
}
