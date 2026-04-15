export interface Reasoning<Effort extends string> {
	readonly reasoning: true
	readonly reasoningEfforts: readonly Effort[]
}
