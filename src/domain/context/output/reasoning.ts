import { InputTextContent } from "../content/input-text"
import { SummaryTextContent } from "../content/summary-text"
import { ContextItem } from "../context-item"

export class Reasoning extends ContextItem {
	readonly type = "reasoning"
	readonly content: InputTextContent | undefined
	readonly encryptedContent: string | undefined
	readonly summary: SummaryTextContent[]

	private constructor(
		content: InputTextContent | undefined,
		encryptedContent?: string | undefined,
		summary: SummaryTextContent[] = [],
	) {
		super()
		this.content = content
		this.encryptedContent = encryptedContent
		this.summary = summary
	}

	static rehydrate(data: {
		content: InputTextContent | undefined
		encryptedContent: string | undefined
		summary: SummaryTextContent[]
	}): Reasoning {
		return new Reasoning(data.content, data.encryptedContent, data.summary)
	}
}
