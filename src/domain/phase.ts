import { Inference } from "./inference/inference"
import { Interaction } from "./interaction"
import { InferenceProvider } from "./model/provider"

export abstract class Phase {
	abstract run(input: Interaction): Promise<Interaction>
}

export class PerceivePhase extends Phase {
	async run(interaction: Interaction): Promise<Interaction> {
		throw new Error("Method not implemented.")
	}
}

export class InferencePhase extends Phase {
	private inferenceProvider: InferenceProvider

	constructor(inferenceProvider: InferenceProvider) {
		super()
		this.inferenceProvider = inferenceProvider
	}

	async run(interaction: Interaction): Promise<Interaction> {
		const inference = await this.inferenceProvider.generate(interaction)
		return new Interaction("inference", interaction.getParticipants(), inference)
	}
}

export class IntentPhase extends Phase {
	async run(interaction: Interaction<Inference>): Promise<Interaction> {
		throw new Error("Method not implemented.")
	}
}

export class FeedbackPhase extends Phase {
	async run(interaction: Interaction): Promise<Interaction> {
		throw new Error("Method not implemented.")
	}
}
