import { Loop } from "@loop/loop"
import { LoopStatus } from "src/domain/loop/loop-context"
import { LoopState } from "src/domain/loop/loop-state"

export class LoopStart implements LoopState {
	run(loop: Loop): void {
		const loopContext = loop.getLoopContext()
		loopContext.status = LoopStatus.RUNNING
	}
}
