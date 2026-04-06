import { Loop } from "@loop/loop"
import { LoopState } from "src/domain/loop/loop-state"

export class CandidateRejection implements LoopState {
	run(loop: Loop): void {
		console.log("CandidateRejection: Context updated", loop.getContext())
	}
}
