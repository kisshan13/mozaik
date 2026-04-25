import { Specification } from "@domain/specification/specification/specification"

export interface Action<T> {
	apply(candidate: T): T
}

export interface AsyncAction<T> {
	apply(candidate: T): Promise<T>
}

export interface AsyncRule<T> {
	specification: Specification<T>
	action: AsyncAction<T>
	apply(candidate: T): Promise<T>
}

export class If<T> implements AsyncRule<T> {
	specification: Specification<T>
	action: AsyncAction<T>

	constructor({ specification, action }: { specification: Specification<T>; action: AsyncAction<T> }) {
		this.specification = specification
		this.action = action
	}

	async apply(candidate: T): Promise<T> {
		if (this.specification.isSatisfiedBy(candidate)) {
			return await this.action.apply(candidate)
		}
		return candidate
	}
}

export class Loop<T> implements AsyncRule<T> {
	specification: Specification<T>
	action: AsyncAction<T>

	constructor({ specification, action }: { specification: Specification<T>; action: AsyncAction<T> }) {
		this.specification = specification
		this.action = action
	}

	async apply(candidate: T): Promise<T> {
		while (this.specification.isSatisfiedBy(candidate)) {
			candidate = await this.action.apply(candidate)
		}
		return candidate
	}
}
