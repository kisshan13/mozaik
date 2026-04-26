import { ContextItem } from "@domain/model-context/context-item/context-item"
import { Role } from "./participant"

export class ContextContribution {
    readonly participantRole: Role
    readonly items: ContextItem[]

    constructor(participantRole: Role, items: ContextItem[]) {
        this.participantRole = participantRole;
        this.items = items;
    }
}