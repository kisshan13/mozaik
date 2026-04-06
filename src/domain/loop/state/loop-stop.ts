import { Loop, StateId } from "@loop/loop"
import { LoopState } from "@loop/loop-state"

export class LoopEnd implements LoopState {
	run(loop: Loop): void {
		loop.setCurrentState(StateId.LOOP_END)
		loop.setNextState(null)
	}
}
