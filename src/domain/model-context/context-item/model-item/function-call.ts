import { ContextItem } from "@domain/model-context/context-item/context-item"

export class FunctionCallItem extends ContextItem {
	readonly type = "function_call"
	readonly callId: string
	readonly name: string
	readonly args: string

	private constructor(callId: string, name: string, args: string) {
		super()
		this.callId = callId
		this.name = name
		this.args = args
	}

	static rehydrate(data: { callId: string; name: string; args: string }): FunctionCallItem {
		return new FunctionCallItem(data.callId, data.name, data.args)
	}

	toJSON(): any {
		return {
			type: this.type,
			call_id: this.callId,
			name: this.name,
			arguments: this.args,
		}
	}
}
