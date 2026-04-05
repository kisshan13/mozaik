import { LoopContext } from "src/domain/loop/loop-context"

export interface Transition {
	apply(loopContext: LoopContext): Promise<void>
}
