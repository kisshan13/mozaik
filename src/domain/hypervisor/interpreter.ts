import { Context } from "./context"
import { Interaction } from "./interaction"

export interface Interpreter {
    interpret(interaction: Interaction, context: Context): void
}