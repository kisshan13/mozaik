import { SessionContext } from "../session/state"
import { GenerationCycle } from "../workflow/generation-cycle"

export abstract class Agent {
	
	readonly context: SessionContext
	readonly cycles: GenerationCycle[]

	constructor(context: SessionContext, generationCycles: GenerationCycle[]) {
		this.context = context
		this.cycles = generationCycles
	}

	async start(): Promise<unknown> {
		const generationCycle = new GenerationCycle()
		return generationCycle.start(this.context)
	}

}
