import { Item } from "./item"
import { ItemStatus } from "./item-status"
import { ModelContent } from "./model-content"
import { InputTextContent, UserContent } from "./user-content"

export type Content = UserContent | ModelContent

export class Message extends Item {
	constructor(
		id: string,
		type: string,
		status: ItemStatus,
		public readonly role: string,
		public readonly content: InputTextContent[],
	) {
		super(id, type, status)
		this.role = role
		this.content = content
	}
}
