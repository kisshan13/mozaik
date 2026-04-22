import { Condition } from "@domain/agent-loop/hook-rules/condition/condition"

export interface Action<T> {
	apply(candidate: T): T
}

export interface AsyncAction<T> {
	apply(candidate: T): Promise<T>
}

export interface AsyncRule<T> {
	condition: Condition<T>
	action: AsyncAction<T>
	apply(candidate: T): Promise<T>
}

export class If<T> implements AsyncRule<T> {
	condition: Condition<T>
	action: AsyncAction<T>

	constructor({ condition, action }: { condition: Condition<T>; action: AsyncAction<T> }) {
		this.condition = condition
		this.action = action
	}

	async apply(candidate: T): Promise<T> {
		if (this.condition.isSatisfiedBy(candidate)) {
			return await this.action.apply(candidate)
		}
		return candidate
	}
}

export class Loop<T> implements AsyncRule<T> {
	condition: Condition<T>
	action: AsyncAction<T>

	constructor({ condition, action }: { condition: Condition<T>; action: AsyncAction<T> }) {
		this.condition = condition
		this.action = action
	}

	async apply(candidate: T): Promise<T> {
		while (this.condition.isSatisfiedBy(candidate)) {
			candidate = await this.action.apply(candidate)
		}
		return candidate
	}
}
