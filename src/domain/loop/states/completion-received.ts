import { Loop } from "@loop/loop"
import { LoopState } from "src/domain/loop/loop-state"

export class CompletionReceived implements LoopState {
	run(loop: Loop): void {
		const loopContext = loop.getLoopContext()
		const model = loopContext.generativeModel

		if (!loopContext.generatedOutput) {
			throw new Error("OutputExtraction: Generated output is required")
		}

		const output = model.extractOutput(loopContext.generatedOutput)
		loopContext.extractedOutput = output

		const tokenUsage = model.extractTokenUsage(loopContext.generatedOutput)
		loopContext.extractedTokenUsage = tokenUsage

		const cost = model.calculateCost(tokenUsage)
		loopContext.extractedCost = cost
	}
}
