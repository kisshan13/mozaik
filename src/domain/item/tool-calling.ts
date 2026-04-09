import { Item } from "./item"
import { ItemState } from "./item-state"

export class ToolCalling extends Item {
	constructor(
		id: string,
		type: string,
		state: ItemState,
		public readonly toolName: string,
		public readonly toolArguments: Record<string, unknown>,
	) {
		super(id, type, state)
	}
}
