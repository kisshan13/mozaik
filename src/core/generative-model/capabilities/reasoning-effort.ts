import { Capability } from "./capability"

export class ReasoningEffort<Effort extends string> extends Capability {
	readonly capability = "reasoning-effort"
	readonly supportedEfforts: readonly Effort[]
	reasoningEffort: Effort

	constructor(supportedEfforts: readonly Effort[], defaultEffort: Effort) {
		super()
		this.supportedEfforts = supportedEfforts
		this.reasoningEffort = defaultEffort
	}

	setReasoningEffort(effort: Effort): void {
		if (!this.supportedEfforts.includes(effort)) {
			throw new Error(`Invalid reasoning effort: ${effort}`)
		}
		this.reasoningEffort = effort;
	}

	getReasoningEffort(): Effort {
		return this.reasoningEffort
	}
}
