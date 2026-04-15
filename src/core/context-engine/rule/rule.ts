import { Condition } from "@core/context-engine/condition/condition"

export interface Action<T, R> {
	apply(candidate: T): R
}

export class Rule<T, R> {
	private condition: Condition<T>
	private action: Action<T, R>

	constructor({ when, then }: { when: Condition<T>; then: Action<T, R> }) {
		this.condition = when	
		this.action = then
	}

	apply(candidate: T): R {
		if (this.condition.isSatisfiedBy(candidate)) {
			return this.action.apply(candidate)
		}
		throw new Error("Condition not satisfied")
	}
}
