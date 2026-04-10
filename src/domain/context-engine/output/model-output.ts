import { Reasoning } from "../../reasoning"
import { FunctionCall } from "../function-call"

export type Item = Reasoning | FunctionCall

export class ModelOutput {
	readonly items: Item[]

	constructor(items: Item[]) {
		this.items = items
	}
}
