import { Interaction } from "./interaction"
import { Interpreter } from "./interpreter"
import { Entity } from "./entity"
import { Context } from "./context"

export class Participant implements Entity {
	id: string
	interpreter: Interpreter

	constructor(id: string, interpreter: Interpreter) {
		this.id = id
		this.interpreter = interpreter
	}

	observe(interaction: Interaction, context: Context): void {
		return this.interpreter.interpret(interaction, context)
	}
}
