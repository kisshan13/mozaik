import { Interaction } from "./interaction"
import { Participant } from "./participant"

export type Episode = {
	id: string
	initiator: Participant
	interaction: Interaction
}
