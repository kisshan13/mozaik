export class SemanticEvent<T> {
	readonly type: string
	readonly data: T

	constructor(type: string, data: T) {
		this.type = type
		this.data = data
	}

	getType(): string {
		return this.type
	}
}
