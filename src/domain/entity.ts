import { Interaction } from "./interaction"
import { Interpreter } from "./interpreter"

export interface Entity {
	id: string
	interpreter: Interpreter
	perceive(interaction: Interaction): Promise<Interaction>
}
