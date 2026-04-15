import { Condition } from "@core/context-engine/condition/condition"

export interface Action<T> {
	apply(candidate: T): T
}

export class Rule<T> {
	private condition: Condition<T>
	private action: Action<T>

	constructor({ when, then }: { when: Condition<T>; then: Action<T> }) {
		this.condition = when
		this.action = then
	}

	apply(candidate: T): T {
		if (this.condition.isSatisfiedBy(candidate)) {
			return this.action.apply(candidate)
		}
		return candidate
	}
}
