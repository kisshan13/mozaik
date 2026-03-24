import { Interaction } from "./interaction"
import { Interpreter } from "./interpreter"

export abstract class Participant {
	abstract interpreter: Interpreter

	async interact(interaction: Interaction) {
		return this.interpreter.run(interaction)
	}
}
