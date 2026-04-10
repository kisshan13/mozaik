import { AndCondition } from "./and-condition"
import { Condition } from "./condition"
import { NotCondition } from "./not-condition"
import { OrCondition } from "./or-condition"

export abstract class BaseCondition<T> implements Condition<T> {
	abstract isSatisfiedBy(candidate: T): boolean

	and(other: Condition<T>): Condition<T> {
		return new AndCondition(this, other)
	}

	or(other: Condition<T>): Condition<T> {
		return new OrCondition(this, other)
	}

	not(): Condition<T> {
		return new NotCondition(this)
	}
}
