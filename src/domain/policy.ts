import { Context } from "src/domain/context"

export type Candidate = Context | unknown

export interface Policy {
	isSatisfiedBy(candidate: Candidate): boolean
	and(other: Policy): Policy
	or(other: Policy): Policy
	not(): Policy
}

export abstract class BasePolicy implements Policy {
	abstract isSatisfiedBy(candidate: Candidate): boolean

	and(other: Policy): Policy {
		return new AndPolicy(this, other)
	}

	or(other: Policy): Policy {
		return new OrPolicy(this, other)
	}

	not(): Policy {
		return new NotPolicy(this)
	}
}

export class AndPolicy extends BasePolicy {
	constructor(
		private readonly left: Policy,
		private readonly right: Policy,
	) {
		super()
	}

	isSatisfiedBy(candidate: Candidate): boolean {
		return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate)
	}
}

export class OrPolicy extends BasePolicy {
	constructor(
		private readonly left: Policy,
		private readonly right: Policy,
	) {
		super()
	}

	isSatisfiedBy(candidate: Candidate): boolean {
		return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
	}
}

export class NotPolicy extends BasePolicy {
	constructor(private readonly policy: Policy) {
		super()
	}

	isSatisfiedBy(candidate: Candidate): boolean {
		return !this.policy.isSatisfiedBy(candidate)
	}
}
