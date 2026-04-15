import { AndCondition } from "@core/context-engine/condition/and-condition"
import { Condition } from "@core/context-engine/condition/condition"
import { NotCondition } from "@core/context-engine/condition/not-condition"
import { OrCondition } from "@core/context-engine/condition/or-condition"

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
