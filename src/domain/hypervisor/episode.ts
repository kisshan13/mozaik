import { Interaction } from "./interaction"
import { Interpretation } from "./interpretation"
import { Participant } from "./participant"

export type Episode = {
	id: string
	initiator: Participant
	interaction: Interaction
	interpretation: Interpretation
}
