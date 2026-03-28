import { Interaction } from "./interaction"
import { Context } from "./context"

export abstract class Participant {
	readonly id: string

	constructor(id: string) {
		this.id = id
	}

	abstract observe(interaction: Interaction, context: Context): void
}
