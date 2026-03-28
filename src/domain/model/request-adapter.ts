import { Interaction } from "../hypervisor/interaction"

export interface RequestAdapter<R> {
	map(interaction: Interaction): R
}
