import { Content } from "../content"

export class SummaryTextContent extends Content {
	readonly type = "summary_text"

	private constructor(public readonly text: string) {
		super()
	}

	static rehydrate(data: { text: string }): SummaryTextContent {
		return new SummaryTextContent(data.text)
	}

	toJSON(): Record<string, any> {
		return {
			type: this.type,
			text: this.text,
		}
	}
}
