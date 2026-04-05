import { Transition } from "src/domain/loop/transition"
import { LoopContext, LoopStatus } from "src/domain/loop/loop-context"

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(loopContext: LoopContext): Promise<void> {
		loopContext.status = LoopStatus.FAILED
	}
}
