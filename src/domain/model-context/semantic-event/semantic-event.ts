export abstract class SemanticEvent {
	abstract readonly type: string

	getType(): string {
		return this.type
	}
}
