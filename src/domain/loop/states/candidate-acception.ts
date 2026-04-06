import { Loop } from "@loop/loop"
import { LoopState } from "src/domain/loop/loop-state"

export class CandidateAcception implements LoopState {
	run(loop: Loop): void {
		console.log("CandidateAcception: Context updated", loop.getLoopContext())
	}
}
