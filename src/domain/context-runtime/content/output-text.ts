import { Content } from "../content"

export class OutputTextContent extends Content {
	readonly type = "output_text"

	private constructor(public readonly text: string) {
		super()
	}

	static rehydrate(data: { text: string }): OutputTextContent {
		return new OutputTextContent(data.text)
	}

	toJSON(): Record<string, any> {
		return {
			type: this.type,
			text: this.text,
		}
	}
}
