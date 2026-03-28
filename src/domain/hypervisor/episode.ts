import { Interaction } from "./interaction"
import { Interpretation } from "./interpretation"

export type Episode = {
	id: string
	interaction: Interaction<unknown>
	interpretation: Interpretation<unknown>
}
