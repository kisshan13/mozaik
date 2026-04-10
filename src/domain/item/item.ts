import { ItemStatus } from "./item-status"

export class Item {
	readonly id: string
	readonly type: string
	readonly status: ItemStatus

	constructor(id: string, type: string, status: ItemStatus) {
		this.id = id
		this.type = type
		this.status = status
	}
}
