import { Item } from "./item"
import { ItemState } from "./item-state"

export class Message extends Item {
	constructor(
		id: string,
		type: string,
		state: ItemState,
		public readonly role: string,
		public readonly content: string,
	) {
		super(id, type, state)
		this.role = role
		this.content = content
	}
}
