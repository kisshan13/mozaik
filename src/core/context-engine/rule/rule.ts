import { Condition } from "@core/context-engine/condition/condition"

export interface Action<T> {
	apply(candidate: T): T
}

export interface Rule<T> {
	condition: Condition<T>
	action: Action<T>
	apply(candidate: T): T
}

export class If<T> implements Rule<T> {
	condition: Condition<T>
	action: Action<T>

	constructor({ condition, action }: { condition: Condition<T>; action: Action<T> }) {
		this.condition = condition
		this.action = action
	}

	apply(candidate: T): T {
		if (this.condition.isSatisfiedBy(candidate)) {
			return this.action.apply(candidate)
		}
		return candidate
	}
}

export class Loop<T> {
	private condition: Condition<T>
	private action: Action<T>

	constructor({ condition, action }: { condition: Condition<T>; action: Action<T> }) {
		this.condition = condition
		this.action = action
	}

	apply(candidate: T): T {
		while (this.condition.isSatisfiedBy(candidate)) {
			candidate = this.action.apply(candidate)
		}
		return candidate
	}
}