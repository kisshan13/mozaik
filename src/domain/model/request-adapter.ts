import { Interaction } from "../interaction/interaction"

export interface RequestAdapter<R> {
	map(interaction: Interaction<unknown>): R
}
