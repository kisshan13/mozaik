import { Interaction } from "../hypervisor/interaction"

export interface ModelRequestMapper<R> {
	map(interaction: Interaction): R
}
