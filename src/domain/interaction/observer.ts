import { Interaction } from "./interaction"

export interface Observer {
    observe(interaction: Interaction): void
}