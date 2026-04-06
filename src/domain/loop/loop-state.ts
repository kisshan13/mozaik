import { Loop } from "./loop"

export interface LoopState {
	run(loop: Loop): void
}
