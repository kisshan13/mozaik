import { InputText } from "@domain/model-context/context-item/item-content/input-text"
import { ContextItem } from "@domain/model-context/context-item/context-item"

export class SystemMessageItem extends ContextItem {
	readonly type = "message"
	readonly role = "system"
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

	static create(text: string): SystemMessageItem {
		const content = InputText.create(text)
		return new SystemMessageItem(content)
	}

	static rehydrate(data: { text: string }): SystemMessageItem {
		const content = InputText.rehydrate(data)
		return new SystemMessageItem(content)
	}
}
