import { Interaction } from "./interaction"
import { Participant } from "./participant"

export class Space {
	participants: Participant[] = []

	enter(participant: Participant) {
		this.participants.push(participant)
	}

	emit(interaction: Interaction) {
		this.participants.forEach((participant) => participant.perceive(interaction))
	}
}
