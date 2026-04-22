import { Content } from "@domain/model-context/content"

export class InputText extends Content {
	readonly type = "input_text"

	private constructor(public readonly text: string) {
		super()
	}

	static create(text: string): InputText {
		return new InputText(text)
	}

	static rehydrate(data: { text: string }): InputText {
		return new InputText(data.text)
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
