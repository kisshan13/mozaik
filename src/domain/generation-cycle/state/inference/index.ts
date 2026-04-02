import { GoTo, GenerationContext, State, StateId, Transition, Fail } from "../../generation-context"

export class Inference implements State {
	async run(generationContext: GenerationContext): Promise<Transition> {
		const model = generationContext.generativeModel

		if (!generationContext.prompt) {
			return new Fail("Inference: Prompt is required")
		}

		const generatedOutput = await model.generate(generationContext.prompt)

		generationContext.generatedOutput = generatedOutput

		return new GoTo(StateId.OUTPUT_EXTRACTION)
	}
}
