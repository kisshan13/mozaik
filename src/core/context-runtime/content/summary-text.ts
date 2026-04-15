import { Content } from "@core/context-runtime/content"

export class SummaryText extends Content {
	readonly type = "summary_text"

	private constructor(public readonly text: string) {
		super()
	}

	static rehydrate(data: { text: string }): SummaryText {
		return new SummaryText(data.text)
	}

	toJSON(): Record<string, any> {
		return {
			type: this.type,
			text: this.text,
		}
	}
}
