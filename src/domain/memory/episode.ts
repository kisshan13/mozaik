import { Interaction } from "../hypervisor/interaction"

export type Episode = {
	id: string
	interaction: Interaction<unknown>
}
