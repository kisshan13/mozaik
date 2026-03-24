import { Interpreter } from "@/domain/interpreter"
import { Participant } from "@/domain/participant"
import { InteractPhase } from "@/domain/phase"

export class Environment extends Participant {
	interpreter: Interpreter = new Interpreter()

	constructor() {
		super()
		this.interpreter.addPhase(new InteractPhase())
	}
}
