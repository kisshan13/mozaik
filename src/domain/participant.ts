import { Interaction } from "./interaction"
import { Interpreter } from "./interpreter"
import { FocusPhase, IntentPhase, InteractPhase } from "./phase"

export abstract class Participant {
	abstract interpreter: Interpreter

	async interact(interaction: Interaction) {
		return this.interpreter.run(interaction)
	}
}
