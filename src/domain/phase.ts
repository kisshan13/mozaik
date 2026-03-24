import { Interaction } from "./interaction"
import { InferenceProvider } from "./model/provider"

export abstract class Phase {
	abstract run(input: Interaction): Promise<Interaction>
}

export class FocusPhase extends Phase {
	async run(interaction: Interaction): Promise<Interaction> {
		throw new Error("Method not implemented.")
	}
}

export class InferencePhase extends Phase {
	private inferenceProvider: InferenceProvider<Interaction>

	constructor(inferenceProvider: InferenceProvider<Interaction>) {
		super()
		this.inferenceProvider = inferenceProvider
	}

	async run(interaction: Interaction): Promise<Interaction> {
		const inference = await this.inferenceProvider.generate(interaction)
		return new Interaction(inference)
	}
}

export class IntentPhase extends Phase {
	async run(interaction: Interaction): Promise<Interaction> {
		throw new Error("Method not implemented.")
	}
}

export class InteractPhase extends Phase {
	async run(interaction: Interaction): Promise<Interaction> {
		throw new Error("Method not implemented.")
	}
}
