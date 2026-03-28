import { Interaction } from "./interaction"
import { Interpreter } from "./interpreter"
import { Tool } from "./tool"

export class Participant {
	readonly id: string
	tools: Tool[]
	interpreter: Interpreter

	constructor(id: string, tools: Tool[], interpreter: Interpreter) {
		this.id = id
		this.tools = tools
		this.interpreter = interpreter
	}

	observe(interaction: Interaction<unknown>): void {
		this.interpreter.execute(interaction)
	}
}
