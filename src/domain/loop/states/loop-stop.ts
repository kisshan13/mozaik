import { Loop } from "@loop/loop"
import { LoopState } from "src/domain/loop/loop-state"

export class LoopStop implements LoopState {
	run(loop: Loop): void {
		const loopContext = loop.getContext()
		console.log("LoopStop: Context updated", loopContext)
	}
}
