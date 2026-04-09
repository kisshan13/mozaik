import { Item } from "./item"

export type OutputItem = Item

export class ModelOutput {
	readonly output: OutputItem[]

	constructor(output: OutputItem[]) {
		this.output = output
	}
}
