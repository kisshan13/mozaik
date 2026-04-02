import { GenerationContext } from "../../generation-context"
import { GoTo } from "../../transition/go-to"
import { StateId } from "../../state"
import { Transition } from "../../transition"
import { State } from "../../state"
import { Fail } from "../../transition/fail"

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
