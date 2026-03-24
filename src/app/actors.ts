import { Interaction } from "@/domain/interaction"
import { Interpreter } from "@/domain/interpreter"
import { Participant } from "@/domain/participant"
import { FocusPhase, IntentPhase, InteractPhase } from "@/domain/phase"

export class Actor extends Participant {
	interpreter: Interpreter = new Interpreter()

	constructor() {
		super()
		this.interpreter.addPhase(new FocusPhase())
		//this.interpreter.addPhase(new InferencePhase(()))
		this.interpreter.addPhase(new IntentPhase())
		this.interpreter.addPhase(new InteractPhase())
	}

	async interact(interaction: Interaction) {
		return this.interpreter.run(interaction)
	}
}

export class Environment extends Participant {
	interpreter: Interpreter = new Interpreter()

	constructor() {
		super()
		//this.interpreter.addPhase(new InteractionPhase())
	}
}
