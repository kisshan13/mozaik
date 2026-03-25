import { Interaction } from "./interaction"
import { Interpreter } from "./interpreter"

export interface Entity {
	id: string
	interpreter: Interpreter
	observe(interaction: Interaction): Promise<Interaction>
}
