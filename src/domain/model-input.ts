import { Reasoning } from "./reasoning"

export type InputItem = Reasoning

export class ModelInput {
	readonly items: InputItem[]

	constructor(items: InputItem[]) {
		this.items = items
	}
}
