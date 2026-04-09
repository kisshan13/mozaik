import { Item } from "./item/item"
import { ItemState } from "./item/item-state"

export class Reasoning extends Item {
	constructor(id: string, type: string, state: ItemState) {
		super(id, type, state)
	}
}
