import { Content } from "src/domain/context/content"

export class OutputText extends Content {
	readonly type = "output_text"

	private constructor(public readonly text: string) {
		super()
	}

	static rehydrate(data: { text: string }): OutputText {
		return new OutputText(data.text)
	}

	toJSON(): any[] {
		return [
			{
				type: this.type,
				text: this.text,
			},
		]
	}
}
