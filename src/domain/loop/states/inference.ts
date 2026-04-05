import { LoopContext } from "src/domain/loop/loop-context"
import { GoTo } from "src/domain/loop/transitions/go-to"
import { StateId } from "src/domain/loop/loop-state"
import { Transition } from "src/domain/loop/transition"
import { LoopState } from "src/domain/loop/loop-state"
import { Fail } from "src/domain/loop/transitions/fail"

export class Inference implements LoopState {
	async run(loopContext: LoopContext): Promise<Transition> {
		const model = loopContext.generativeModel

		if (!loopContext.prompt) {
			return new Fail("Inference: Prompt is required")
		}

		const generatedOutput = await model.generate(loopContext.prompt)

		loopContext.generatedOutput = generatedOutput

		return new GoTo(StateId.COMPLETION_RECEIVED)
	}
}
