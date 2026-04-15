import { BaseCondition } from "@core/context-engine/condition/base-condition"
import { Condition } from "@core/context-engine/condition/condition"

export class NotCondition<T> extends BaseCondition<T> {
	constructor(private readonly condition: Condition<T>) {
		super()
	}

	isSatisfiedBy(candidate: T): boolean {
		return !this.condition.isSatisfiedBy(candidate)
	}
}
