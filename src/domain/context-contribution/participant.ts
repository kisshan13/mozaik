import { ModelContext } from "@domain/model-context/model-context"
import { ContextContribution } from "./contribution"

export enum Role {
    USER = "user",
    DEVELOPER = "developer",
    MODEL = "model",
    SYSTEM = "system",
    TOOL = "tool",
}

export abstract class Participant {
    readonly role: Role

    constructor(role: Role) {
        this.role = role;
    }

    abstract contribute(
      context: ModelContext,
      signal?: AbortSignal
    ): AsyncIterable<ContextContribution>
}