import { Interaction } from "./interaction"
import { Interpreter } from "./interpreter"
import { Entity } from "./entity"

export class Participant implements Entity {
	id: string
	interpreter: Interpreter

	constructor(id: string, interpreter: Interpreter) {
		this.id = id
		this.interpreter = interpreter
	}

	async perceive(interaction: Interaction): Promise<Interaction> {
		return this.interpreter.interpret(interaction)
	}
}
