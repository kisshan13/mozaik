import { BaseCondition } from "@core/context-engine/condition/base-condition"
import { Condition } from "@core/context-engine/condition/condition"

export class AndCondition<T> extends BaseCondition<T> {
	constructor(
		private readonly left: Condition<T>,
		private readonly right: Condition<T>,
	) {
		super()
	}

	isSatisfiedBy(candidate: T): boolean {
		return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate)
	}
}
