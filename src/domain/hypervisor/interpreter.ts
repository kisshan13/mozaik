import { Interaction } from "./interaction"
import { Interpretation } from "./interpretation"

export abstract class Interpreter {
	abstract execute(interaction: Interaction<unknown>): Promise<Interpretation<unknown>>
}
