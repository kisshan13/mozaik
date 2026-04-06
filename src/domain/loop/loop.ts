import { LoopContext } from "./loop-context"

export class Loop {
	private id: string
	private context: LoopContext

	constructor(id: string, context: LoopContext) {
		this.id = id
		this.context = context
	}

	getId(): string {
		return this.id
	}

	getContext(): LoopContext {
		return this.context
	}

	static create(loopContext: LoopContext) {
		const id = crypto.randomUUID()
		return new Loop(id, loopContext)
	}
}
