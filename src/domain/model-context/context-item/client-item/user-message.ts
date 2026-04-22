import { ContextItem } from "@domain/model-context/context-item/context-item"
import { InputText } from "@domain/model-context/context-item/item-content/input-text"

export class UserMessage extends ContextItem {
	readonly type = "message"
	readonly role = "user"
	readonly content: InputText

	private constructor(content: InputText) {
		super()
		this.content = content
	}

	static create(text: string): UserMessage {
		const content = InputText.create(text)
		return new UserMessage(content)
	}

	static rehydrate(data: { text: string }): UserMessage {
		const content = InputText.rehydrate(data)
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
