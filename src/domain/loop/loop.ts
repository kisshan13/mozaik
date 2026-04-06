import { LoopContext } from "./loop-context"

export class Loop {
	private id: string
	private loopContext: LoopContext

	constructor(id: string, loopContext: LoopContext) {
		this.id = id
		this.loopContext = loopContext
	}

	getId(): string {
		return this.id
	}

	getLoopContext(): LoopContext {
		return this.loopContext
	}

	static create(loopContext: LoopContext) {
		const id = crypto.randomUUID()
		return new Loop(id, loopContext)
	}
}
