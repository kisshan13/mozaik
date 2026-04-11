import { InputText } from "../content/input-text"
import { ContextItem } from "../context-item"

export class DeveloperMessage extends ContextItem {
	readonly type = "message"
	readonly role = "developer"
	readonly content: InputText

	private constructor(content: InputText) {
		super()
		this.content = content
	}

	toJSON(): any {
		return {
			type: this.type,
			role: this.role,
			content: this.content.toJSON(),
		}
	}

	static create(text: string): DeveloperMessage {
		const content = InputText.create(text)
		return new DeveloperMessage(content)
	}

	static rehydrate(data: { text: string }): DeveloperMessage {
		const content = InputText.rehydrate(data)
		return new DeveloperMessage(content)
	}
}
