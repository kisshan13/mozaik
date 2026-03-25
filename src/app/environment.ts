import { Interaction } from "@/domain/interaction"
import { Interpreter } from "@/domain/interpreter"
import { Participant } from "@/domain/participant"
import { FeedbackPhase } from "@/domain/phase"

export class EnvironmentInterpreter extends Interpreter {
	async interpret(interaction: Interaction): Promise<Interaction> {
		throw new Error("Method not implemented.")
	}
}

export class Environment extends Participant {
	interpreter: Interpreter = new EnvironmentInterpreter()

	constructor() {
		super("environment", new EnvironmentInterpreter())
		this.interpreter.addPhase(new FeedbackPhase())
	}
}
