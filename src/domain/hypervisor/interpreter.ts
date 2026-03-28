import { Interaction } from "./interaction"
import { Interpretation } from "./interpretation"

export interface Interpreter {
	execute(interaction: Interaction): Promise<Interpretation>
}
