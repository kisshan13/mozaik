import { GoTo, GenerationContext, State, StateId, Transition, Fail } from "../../generation-context"

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
