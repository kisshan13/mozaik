import { Content } from "../content"

export class InputTextContent extends Content {
	readonly type = "input_text"

	private constructor(public readonly text: string) {
		super()
	}

	static create(text: string): InputTextContent {
		return new InputTextContent(text)
	}

	static rehydrate(data: { text: string }): InputTextContent {
		return new InputTextContent(data.text)
	}
}
