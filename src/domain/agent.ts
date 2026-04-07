import { Context } from "./context"

export enum TokenDeliveryMode {
	BUFFERING = "buffering",
	STREAMING = "streaming",
}

export class Agent {
	private id: string
	private context: Context
	private tokenDeliveryMode: TokenDeliveryMode

	constructor(id: string, context: Context, tokenDeliveryMode: TokenDeliveryMode) {
		this.id = id
		this.context = context
		this.tokenDeliveryMode = tokenDeliveryMode
	}

	getId(): string {
		return this.id
	}

	getContext(): Context {
		return this.context
	}

	getTokenDeliveryMode(): TokenDeliveryMode {
		return this.tokenDeliveryMode
	}

	static create(context: Context, tokenDeliveryMode: TokenDeliveryMode = TokenDeliveryMode.BUFFERING) {
		const id = crypto.randomUUID()
		return new Agent(id, context, tokenDeliveryMode)
	}
}
