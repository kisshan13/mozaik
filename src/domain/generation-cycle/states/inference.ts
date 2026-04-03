import { GenerationContext } from "@generation-cycle/generation-context"
import { GoTo } from "@generation-cycle/transition/go-to"
import { StateId } from "@generation-cycle/state"
import { Transition } from "@generation-cycle/transition"
import { State } from "@generation-cycle/state"
import { Fail } from "@generation-cycle/transition/fail"

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
