import { Item } from "./item"
import { ItemStatus } from "./item-status"

export class ToolCalling extends Item {
	constructor(
		id: string,
		type: string,
		status: ItemStatus,
		public readonly toolName: string,
		public readonly toolArguments: Record<string, unknown>,
	) {
		super(id, type, status)
	}
}
