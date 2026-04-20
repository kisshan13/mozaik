import { ContextItem } from "@core/context/context-item"

export class Context {
	readonly id: string
	readonly projectId: string
	readonly items: ContextItem[]

	constructor(id: string, projectId: string, items: ContextItem[]) {
		this.projectId = projectId
		this.id = id
		this.items = items
	}

	addItem(item: ContextItem): Context {
		this.items.push(item)
		return this
	}

	applyModelOutput(items: ContextItem[]): Context {
		for (const item of items) {
			const itemType = item.getType()
			if (itemType !== "function_call" && itemType !== "message" && itemType !== "reasoning") {
				throw new Error(`Invalid item type: ${itemType}`)
			}
		}
		this.items.push(...items)
		return this
	}

	getItems(): ContextItem[] {
		return this.items
	}

	static create(projectId: string): Context {
		const id = crypto.randomUUID()
		return new Context(id, projectId, [])
	}

	static rehydrate(data: { id: string; projectId: string; items: ContextItem[] }): Context {
		return new Context(data.id, data.projectId, data.items)
	}

	toJSON(): any {
		return this.items.map((item) => item.toJSON())
	}
}
