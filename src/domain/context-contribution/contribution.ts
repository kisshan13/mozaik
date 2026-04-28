import { DeveloperMessageItem } from "@domain/model-context/context-item/client-item/developer-message"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { SystemMessageItem } from "@domain/model-context/context-item/client-item/system-message"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelContext } from "@domain/model-context/model-context"

export enum Role {
	USER = "user",
	DEVELOPER = "developer",
	MODEL = "model",
	SYSTEM = "system",
}

export abstract class ContextItemProducer {
	abstract produce(context: ModelContext, signal?: AbortSignal): AsyncIterable<ContextItem>
}

export class Participant implements ContextItemProducer {
	private readonly userInputStream: AsyncIterable<string>

	constructor(userInputStream: AsyncIterable<string>) {
		this.userInputStream = userInputStream
	}

	async *produce(
		context: ModelContext,
		signal?: AbortSignal,
	): AsyncIterable<UserMessageItem | DeveloperMessageItem | ReasoningItem | FunctionCallItem | ModelMessageItem> {
		for await (const message of this.userInputStream) {
			yield UserMessageItem.create(message)
		}
	}
}

export class Tool implements ContextItemProducer {
	private readonly tool: Tool

	constructor(tool: Tool) {
		this.tool = tool
	}

	async *produce(context: ModelContext, signal?: AbortSignal): AsyncIterable<FunctionCallOutputItem> {
		yield FunctionCallOutputItem.create("", "")
	}
}

export class Environment implements ContextItemProducer {
	private readonly message: string

	constructor(message: string) {
		this.message = message
	}

	async *produce(context: ModelContext, signal?: AbortSignal): AsyncIterable<SystemMessageItem> {
		yield SystemMessageItem.create(this.message)
	}
}
