import { Context } from "../hypervisor/context"
import { ContextEngineeringStrategy } from "./context-engineering-strategy"
import { Interaction } from "../hypervisor/interaction"

export interface LlmGateway {
    generate(input: unknown): Promise<unknown>
}

export abstract class Agent {

    id: string
    contextEngineeringStrategy: ContextEngineeringStrategy

    constructor(id: string, contextEngineeringStrategy: ContextEngineeringStrategy) {
        this.id = id
        this.contextEngineeringStrategy = contextEngineeringStrategy
    }

	observe(interaction: Interaction, context: Context): void {
        this.contextEngineeringStrategy.execute(interaction, context)
	}

}