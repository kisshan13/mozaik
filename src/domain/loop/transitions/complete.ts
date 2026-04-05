import { Transition } from "src/domain/loop/transition"
import { LoopContext, LoopStatus } from "src/domain/loop/loop-context"

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(loopContext: LoopContext): Promise<void> {
		loopContext.status = LoopStatus.COMPLETED
	}
}
