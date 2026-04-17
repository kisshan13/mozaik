import { ContextItem } from "@core/context-runtime/context-item"
import { InputText } from "@core/context-runtime/content/input-text"

export class FunctionCallOutput extends ContextItem {
	readonly type = "function_call_output"
	readonly callId: string
	readonly output: InputText

	private constructor(callId: string, output: InputText) {
		super()
		this.callId = callId
		this.output = output
	}

	static create(callId: string, output: string): FunctionCallOutput {
		const outputText = InputText.create(output)
		return new FunctionCallOutput(callId, outputText)
	}

	static rehydrate(data: { callId: string; output: InputText }): FunctionCallOutput {
		return new FunctionCallOutput(data.callId, data.output)
	}

	toJSON(): any {
		return {
			type: this.type,
			call_id: this.callId,
			output: this.output.toJSON(),
		}
	}
}
