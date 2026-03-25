import { Interaction } from "./interaction"
import { Phase } from "./phase"

export class Interpreter {
	phases: Phase[] = []

	addPhase(phase: Phase) {
		this.phases.push(phase)
	}

	async interpret(interaction: Interaction): Promise<Interaction> {
		for (const phase of this.phases) {
			interaction = await phase.run(interaction)
		}
		return interaction
	}
}
