import { Context } from "../hypervisor/context"
import { Interaction } from "../hypervisor/interaction"

export interface ContextEngineeringStrategy {
    execute(
        interaction: Interaction,
        context: Context
      ): Promise<unknown>
}