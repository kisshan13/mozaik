export interface ContextEngineeringStrategy {
	execute(data: unknown): Promise<unknown>
}
