export interface ReasoningEffort<Effort extends string> {
	setReasoningEffort(effort: Effort): void
	getReasoningEffort(): Effort
}
