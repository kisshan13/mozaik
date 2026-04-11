import { ContextItem } from "../context-item"
import { OutputTextContent } from "../content/output-text"

export class ModelMessage extends ContextItem {
	readonly type = "message"
	readonly role = "assistant"
	readonly content: OutputTextContent

	constructor(content: OutputTextContent) {
		super()
		this.content = content
	}

	static rehydrate(data: { text: string }): ModelMessage {
		const content = OutputTextContent.rehydrate(data)
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
