import { ItemState } from "./item-state"

export class Item {
	readonly id: string
	readonly type: string
	readonly state: ItemState

	constructor(id: string, type: string, state: ItemState) {
		this.id = id
		this.type = type
		this.state = state
	}

	changeStatus(status: string): void {
		this.state.changeStatus(status)
	}
}
