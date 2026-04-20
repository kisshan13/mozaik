import { InputText } from "@core/context/content/input-text"
import { SummaryText } from "@core/context/content/summary-text"
import { ContextItem } from "@core/context/context-item"

export class Reasoning extends ContextItem {
	readonly type = "reasoning"
	readonly content: InputText | undefined
	readonly encryptedContent: string | undefined
	readonly summary: SummaryText[]

	private constructor(
		content: InputText | undefined,
		encryptedContent?: string | undefined,
		summary: SummaryText[] = [],
	) {
		super()
		this.content = content
		this.encryptedContent = encryptedContent
		this.summary = summary
	}

	static rehydrate(data: {
		content: InputText | undefined
		encryptedContent: string | undefined
		summary: SummaryText[]
	}): Reasoning {
		return new Reasoning(data.content, data.encryptedContent, data.summary)
	}

	toJSON(): any {
		return {
			type: this.type,
			content: this.content?.toJSON(),
			encryptedContent: this.encryptedContent,
			summary: this.summary.map((s) => s.toJSON()),
		}
	}
}
