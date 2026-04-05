import { LoopContext } from "./loop-context"

export class Loop {
	private id: string
	private loopContext: LoopContext

	constructor(id: string, loopContext: LoopContext) {
		this.id = id
		this.loopContext = loopContext
	}

	static create(loopContext: LoopContext) {
		const id = crypto.randomUUID()
		return new Loop(id, loopContext)
	}
}
