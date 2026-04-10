import { BaseCondition } from "./base-condition"
import { Condition } from "./condition"

export class NotCondition<T> extends BaseCondition<T> {
	constructor(private readonly condition: Condition<T>) {
		super()
	}

	isSatisfiedBy(candidate: T): boolean {
		return !this.condition.isSatisfiedBy(candidate)
	}
}
