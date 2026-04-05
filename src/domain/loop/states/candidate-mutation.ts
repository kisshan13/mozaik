import { Loop } from "@loop/loop"
import { LoopState } from "src/domain/loop/loop-state"

export class CandidateMutation implements LoopState {
	run(loop: Loop): void {
		console.log("CandidateMutation: Context updated", loop.getLoopContext())
	}
}
