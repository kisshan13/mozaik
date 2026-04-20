export class Interaction<T> {
	readonly type: "effect" | "motion"
	readonly data: T

	constructor(type: "effect" | "motion", data: T) {
		this.type = type
		this.data = data
	}
}

export class Effect<T> extends Interaction<T> {
	constructor(data: T) {
		super("effect", data)
	}
}

export class Motion<T> extends Interaction<T> {
	constructor(data: T) {
		super("motion", data)
	}
}
