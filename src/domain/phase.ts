import { Interaction } from "./interaction"

export abstract class Phase<I, O> {
    abstract run(input: I): Promise<O>
}

export class AttentionPhase extends Phase<Interaction, Interaction> {
    async run(interaction: Interaction): Promise<Interaction> {
        throw new Error("Method not implemented.")
    }
}

export class InferencePhase extends Phase<Interaction, Interaction> {
    async run(interaction: Interaction): Promise<Interaction> {
        throw new Error("Method not implemented.")
    }
}

export class IntentionPhase extends Phase<Interaction, Interaction> {
    async run(interaction: Interaction): Promise<Interaction> {
        throw new Error("Method not implemented.")
    }
}

export class InteractionPhase extends Phase<Interaction, Interaction> {
    async run(interaction: Interaction): Promise<Interaction> {
        throw new Error("Method not implemented.")
    }
}