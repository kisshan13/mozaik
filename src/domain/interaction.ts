export class Interaction<T = unknown> {
	readonly data: T

	constructor(data: T) {
		this.data = data
	}
}
