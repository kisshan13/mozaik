export interface Condition<T> {
	isSatisfiedBy(candidate: T): boolean
	and(other: Condition<T>): Condition<T>
	or(other: Condition<T>): Condition<T>
	not(): Condition<T>
}

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

export class NotCondition<T> extends BaseCondition<T> {
	constructor(private readonly condition: Condition<T>) {
		super()
	}

	isSatisfiedBy(candidate: T): boolean {
		return !this.condition.isSatisfiedBy(candidate)
	}
}

export class OrCondition<T> extends BaseCondition<T> {
	constructor(
		private readonly left: Condition<T>,
		private readonly right: Condition<T>,
	) {
		super()
	}

	isSatisfiedBy(candidate: T): boolean {
		return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
	}
}
