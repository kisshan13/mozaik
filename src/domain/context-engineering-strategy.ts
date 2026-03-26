import { Context } from "./context"
import { Interaction } from "./interaction"

export interface ContextEngineeringStrategy {
    execute(
        interaction: Interaction,
        context: Context
      ): Promise<unknown>
}