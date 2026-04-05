import { LoopContext, LoopStatus } from "src/domain/loop/loop-context"
import { GoTo } from "src/domain/loop/transitions/go-to"
import { StateId } from "src/domain/loop/loop-state"
import { Transition } from "src/domain/loop/transition"
import { LoopState } from "src/domain/loop/loop-state"

export class LoopStart implements LoopState {
	async run(loopContext: LoopContext): Promise<Transition> {
		loopContext.status = LoopStatus.RUNNING
		return new GoTo(StateId.INFERENCE)
	}
}
