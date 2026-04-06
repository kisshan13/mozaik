import { Loop } from "@loop/loop"
import { LoopState } from "src/domain/loop/loop-state"

export class CompletionReceived implements LoopState {
	run(loop: Loop): void {
		const Context = loop.getContext()
		const model = Context.generativeModel

		if (!Context.generatedOutput) {
			throw new Error("OutputExtraction: Generated output is required")
		}

		const output = model.extractOutput(Context.generatedOutput)
		Context.extractedOutput = output

		const tokenUsage = model.extractTokenUsage(Context.generatedOutput)
		Context.extractedTokenUsage = tokenUsage

		const cost = model.calculateCost(tokenUsage)
		Context.extractedCost = cost
	}
}
