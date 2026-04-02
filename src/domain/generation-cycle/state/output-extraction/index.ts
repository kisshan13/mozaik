import { GenerationContext } from "../../generation-context"
import { GoTo } from "../../transition/go-to"
import { StateId } from "../../state"
import { Transition } from "../../transition"
import { State } from "../../state"
import { Fail } from "../../transition/fail"

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
