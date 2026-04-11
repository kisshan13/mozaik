import { ContextItem } from "./context-item"

export class Context {
	readonly items: ContextItem[]

	constructor(items: ContextItem[]) {
		this.items = items
	}

	addItem(item: ContextItem): Context {
		this.items.push(item)
		return this
	}

	getItems(): ContextItem[] {
		return this.items
	}

	static create(): Context {
		return new Context([])
	}

	toJSON(): any {
		return this.items.map((item) => item.toJSON())
	}
}
