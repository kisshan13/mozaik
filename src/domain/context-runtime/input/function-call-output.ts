import { ContextItem } from "../context-item"
import { InputTextContent } from "../content/input-text"

export class FunctionCallOutput extends ContextItem {
	readonly type = "function_call_output"
	readonly callId: string
	readonly output: InputTextContent[]

	constructor(callId: string, output: InputTextContent[]) {
		super()
		this.callId = callId
		this.output = output
	}

	static create(callId: string, output: InputTextContent[]): FunctionCallOutput {
		return new FunctionCallOutput(callId, output)
	}

	static rehydrate(data: { callId: string; output: InputTextContent[] }): FunctionCallOutput {
		return new FunctionCallOutput(data.callId, data.output)
	}

	toJSON(): any {
		return {
			type: this.type,
			callId: this.callId,
			output: this.output.map((o) => o.toJSON()),
		}
	}
}
