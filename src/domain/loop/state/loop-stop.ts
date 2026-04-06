import { Loop } from "@loop/loop"
import { LoopState } from "src/domain/loop/loop-state"

export class LoopStop implements LoopState {
	run(loop: Loop): void {
		const context = loop.getContext()
		console.log("LoopStop: Context updated", context)
	}
}
