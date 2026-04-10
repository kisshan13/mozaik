import { ContextItem } from "./context-item"

export class Context {
	readonly items: ContextItem[]

	constructor(items: ContextItem[]) {
		this.items = items
	}
}
