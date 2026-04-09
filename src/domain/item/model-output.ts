import { Reasoning } from "../reasoning"
import { Message } from "./message"
import { ToolCalling } from "./tool-calling"

export type OutputItem = Reasoning | ToolCalling | Message

export class ModelOutput {
	readonly output: OutputItem[]

	constructor(output: OutputItem[]) {
		this.output = output
	}
}
