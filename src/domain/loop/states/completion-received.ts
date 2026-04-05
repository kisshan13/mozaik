import { LoopContext } from "src/domain/loop/loop-context"
import { GoTo } from "src/domain/loop/transitions/go-to"
import { StateId } from "src/domain/loop/loop-state"
import { Transition } from "src/domain/loop/transition"
import { LoopState } from "src/domain/loop/loop-state"
import { Fail } from "src/domain/loop/transitions/fail"

export class CompletionReceived implements LoopState {
	async run(loopContext: LoopContext): Promise<Transition> {
		const model = loopContext.generativeModel

		if (!loopContext.generatedOutput) {
			return new Fail("OutputExtraction: Generated output is required")
		}

		const output = await model.extractOutput(loopContext.generatedOutput)
		loopContext.extractedOutput = output

		const tokenUsage = await model.extractTokenUsage(loopContext.generatedOutput)
		loopContext.extractedTokenUsage = tokenUsage

		const cost = await model.calculateCost(tokenUsage)
		loopContext.extractedCost = cost

		return new GoTo(StateId.LOOP_END)
	}
}
