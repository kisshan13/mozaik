import { InputTextContent } from "../content/input-text"
import { ContextItem } from "../context-item"

export class DeveloperMessage extends ContextItem {
	readonly type = "message"
	readonly role = "developer"
	readonly content: InputTextContent

	constructor(content: InputTextContent) {
		super()
		this.content = content
	}

	static create(text: string): DeveloperMessage {
		const content = InputTextContent.create(text)
		return new DeveloperMessage(content)
	}

	static rehydrate(data: { text: string }): DeveloperMessage {
		const content = InputTextContent.rehydrate(data)
		return new DeveloperMessage(content)
	}
}
