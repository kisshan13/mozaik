class ContextWindow {
	constructor(
		readonly contextId: string,
		readonly capacity: number,
		readonly inputTokens: number,
		readonly reservedOutputTokens: number,
		readonly reservedReasoningTokens: number = 0,
	) {}

	get plannedTokens(): number {
		return this.inputTokens + this.reservedOutputTokens + this.reservedReasoningTokens
	}

	get remainingTokens(): number {
		return Math.max(0, this.capacity - this.plannedTokens)
	}

	get fits(): boolean {
		return this.plannedTokens <= this.capacity
	}

	get overflow(): number {
		return Math.max(0, this.plannedTokens - this.capacity)
	}
}
