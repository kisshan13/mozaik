import { Interaction } from "./interaction"
import { Phase } from "./phase"

export class Interpreter {
	phases: Phase[] = []

	addPhase(phase: Phase) {
		this.phases.push(phase)
	}

	async run(interaction: Interaction): Promise<Interaction> {
		let evolvingInteraction = interaction
		for (const phase of this.phases) {
			evolvingInteraction = await phase.run(evolvingInteraction)
		}

		return evolvingInteraction
	}
}
