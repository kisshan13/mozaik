import { Item } from "./context-engine/context/context-item"
import { ItemStatus } from "./context-engine/context/context-unit-status"

export class Reasoning extends Item {
	public readonly content?: string
	public readonly encryptedContent?: string
	public readonly summary?: string
	constructor(
		id: string,
		type: string,
		status: ItemStatus,
		content?: string,
		encryptedContent?: string,
		summary?: string,
	) {
		super(id, type, status)
		this.content = content
		this.encryptedContent = encryptedContent
		this.summary = summary
	}
}
