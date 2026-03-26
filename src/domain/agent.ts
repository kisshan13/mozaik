import { Context } from "./context"
import { ContextEngineeringStrategy } from "./context-engineering-strategy"
import { Interaction } from "./interaction"
import { Participant } from "./participant"

export interface LlmGateway {
    generate(input: unknown): Promise<unknown>
}

export abstract class Agent extends Participant {

    contextEngineeringStrategy: ContextEngineeringStrategy


    constructor(id: string, contextEngineeringStrategy: ContextEngineeringStrategy) {
        super(id)
        this.contextEngineeringStrategy = contextEngineeringStrategy
    }

	async observe(interaction: Interaction, context: Context): Promise<unknown> {
        return this.contextEngineeringStrategy.execute(interaction, context)
	}

}