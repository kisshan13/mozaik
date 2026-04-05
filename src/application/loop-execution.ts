import { Loop } from "@loop/loop"
import { LoopContext } from "@loop/loop-context"
import { ContextPublisher } from "src/domain/events/subject"

export class LoopExecution {
	private publisher: ContextPublisher
	constructor(publisher: ContextPublisher) {
		this.publisher = publisher
	}

	async execute(loopContext: LoopContext): Promise<void> {
		const loop = new Loop(this.publisher)
		loop.start(loopContext)
	}
}
