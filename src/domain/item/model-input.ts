import { Reasoning } from "../reasoning"
import { Message } from "./message"
import { ToolCalling } from "./tool-calling"

export type InputItem = Reasoning | ToolCalling | Message

export class ModelInput {
	readonly items: InputItem[]

	constructor(items: InputItem[]) {
		this.items = items
	}
}
