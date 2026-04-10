export class UserContent {
	type: string
	constructor(type: string) {
		this.type = type
	}
}

export class InputTextContent extends UserContent {
	constructor(public readonly text: string) {
		super("input_text")
	}
}
