export interface ModelGateway {
	generate(request: unknown): Promise<unknown>
}
