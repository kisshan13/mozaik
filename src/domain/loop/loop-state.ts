import { LoopContext } from "src/domain/loop/loop-context"
import { Transition } from "src/domain/loop/transition"

export enum StateId {
	LOOP_START,
	INFERENCE,
	COMPLETION_RECEIVED,
	LOOP_END,
}

export interface LoopState {
	run(loopContext: LoopContext): Promise<Transition>
}
