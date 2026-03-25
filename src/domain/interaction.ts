export class Interaction<T = unknown> {
	readonly type: string
	readonly context: T

	constructor(type: string, context: T) {
		this.type = type
		this.context = context
	}
}
