import { ContextItem } from "src/domain/context/context-item"
import { OutputText } from "src/domain/context/content/output-text"

export class ModelMessage extends ContextItem {
	readonly type = "message"
	readonly role = "assistant"
	readonly content: OutputText

	private constructor(content: OutputText) {
		super()
		this.content = content
	}

	static rehydrate(data: { text: string }): ModelMessage {
		const content = OutputText.rehydrate(data)
		return new ModelMessage(content)
	}

	toJSON(): any {
		return {
			type: this.type,
			role: this.role,
			content: this.content.toJSON(),
		}
	}
}
