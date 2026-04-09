import { Item } from "./item"
import { ItemState } from "./item-state"

export class Reasoning extends Item {
	constructor(id: string, type: string, state: ItemState) {
		super(id, type, state)
	}
}
