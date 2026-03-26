import { Context } from "./context"
import { Interaction } from "./interaction"

export abstract class Participant {
	id: string

	constructor(id: string) {
		this.id = id
	}

	abstract observe(interaction: Interaction, context: Context): Promise<unknown>
}
