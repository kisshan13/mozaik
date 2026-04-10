export interface Condition<T> {
	isSatisfiedBy(candidate: T): boolean
	and(other: Condition<T>): Condition<T>
	or(other: Condition<T>): Condition<T>
	not(): Condition<T>
}
