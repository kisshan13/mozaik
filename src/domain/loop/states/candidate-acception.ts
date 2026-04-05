import { LoopContext } from "src/domain/loop/loop-context"
import { GoTo } from "src/domain/loop/transitions/go-to"
import { StateId } from "src/domain/loop/loop-state"
import { Transition } from "src/domain/loop/transition"
import { LoopState } from "src/domain/loop/loop-state"

export class CandidateAcception implements LoopState {
	async run(loopContext: LoopContext): Promise<Transition> {
		return new GoTo(StateId.LOOP_STOP)
	}
}
