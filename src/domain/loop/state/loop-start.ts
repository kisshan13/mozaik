import { Loop } from "@loop/loop"
import { LoopState } from "@loop/loop-state"
import { StateId } from "@loop/loop"

export class LoopStart implements LoopState {
	run(loop: Loop): void {
		loop.setCurrentState(StateId.LOOP_START)
		loop.setNextState(StateId.INFERENCE)
	}
}
