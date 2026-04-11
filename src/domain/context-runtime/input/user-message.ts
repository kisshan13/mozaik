import { ContextItem } from "../context-item"
import { InputTextContent } from "../content/input-text"

export class UserMessage extends ContextItem {
	readonly type = "message"
	readonly role = "user"
	readonly content: InputTextContent

	constructor(content: InputTextContent) {
		super()
		this.content = content
	}

	static create(text: string): UserMessage {
		const content = InputTextContent.create(text)
		return new UserMessage(content)
	}

	static rehydrate(data: { text: string }): UserMessage {
		const content = InputTextContent.rehydrate(data)
		return new UserMessage(content)
	}

	toJSON(): any {
		return {
			type: this.type,
			role: this.role,
			content: this.content.toJSON(),
		}
	}
}
