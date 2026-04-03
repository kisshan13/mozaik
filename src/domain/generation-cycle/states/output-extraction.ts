import { GenerationContext } from "@generation-cycle/generation-context"
import { GoTo } from "@generation-cycle/transitions/go-to"
import { StateId } from "@generation-cycle/state"
import { Transition } from "@generation-cycle/transition"
import { State } from "@generation-cycle/state"
import { Fail } from "@generation-cycle/transitions/fail"

export class OutputExtraction implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		const model = generationContext.generativeModel

		if (!generationContext.generatedOutput) {
			return new Fail("OutputExtraction: Generated output is required")
		}

		const output = await model.extractOutput(generationContext.generatedOutput)
		generationContext.extractedOutput = output

		const tokenUsage = await model.extractTokenUsage(generationContext.generatedOutput)
		generationContext.extractedTokenUsage = tokenUsage

		const cost = await model.calculateCost(tokenUsage)
		generationContext.extractedCost = cost

		return new GoTo(StateId.OUTPUT_EXECUTION)
	}
}
