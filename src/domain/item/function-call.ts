import { Item } from "./item"
import { ItemStatus } from "./item-status"

export class FunctionCall extends Item {
	constructor(
		public readonly id: string,
		public readonly status: ItemStatus,
		public readonly callId: string,
		public readonly name: string,
		public readonly params: string,
	) {
		super(id, "function_call", status)
		this.name = name
		this.params = params
	}
}
