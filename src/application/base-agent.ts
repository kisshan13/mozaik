import { StateId } from "@domain/agnet-loop/state/state"
import { AgentRuntime } from "./agent-runtime"
import { UserMessage } from "@domain/context/input/user-message"
import { ModelMessage } from "@domain/context/output/model-message"
import { Context } from "@domain/context/context"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"

export class BaseAgent {
	constructor(private readonly runtime: AgentRuntime) {
		this.runtime.on(StateId.USER_MESSAGE_RECEIVED, this.onUserMessageReceived)
		this.runtime.on(StateId.MODEL_MESSAGE_RECEIVED, this.onModelMessageReceived)
	}

	async onUserMessageReceived({
		userMessage,
		context,
	}: {
		userMessage: UserMessage
		context: Context
	}): Promise<void> {
		const updatedContext = await this.onUserMessage(userMessage, context)
	}
	async onModelMessageReceived({
		modelMessage,
		context,
	}: {
		modelMessage: ModelMessage
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async onUserMessage(userMessage: UserMessage, context: Context): Promise<Context> {
		return Promise.resolve(context)
	}

	async message(
		userMessage: UserMessage,
		model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability,
		context: Context,
	): Promise<void> {
		return this.runtime.start(userMessage, model, context)
	}
}
