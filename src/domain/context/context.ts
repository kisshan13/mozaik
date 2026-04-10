import { ContextItem } from "./context-item"

export class Context {
	readonly items: ContextItem[]

	constructor(items: ContextItem[]) {
		this.items = items
	}

	addItem(item: ContextItem): void {
		this.items.push(item)
	}

	getItems(): ContextItem[] {
		return this.items
	}
}
