import { Item } from "./item/item"
import { ItemStatus } from "./item/item-status"

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
