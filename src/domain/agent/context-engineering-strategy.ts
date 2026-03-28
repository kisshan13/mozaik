import { Interaction } from "../hypervisor/interaction"

export interface ContextEngineeringStrategy {
	execute(interaction: Interaction<unknown>): Promise<unknown>
}
