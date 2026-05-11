import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { InputCapable } from "@domain/agentic-environment/capabilities"
import { InputStream } from "@domain/agentic-environment/input-stream"
import { Participant } from "@domain/agentic-environment/participant"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"

export class BaseHumanParticipant extends Participant implements InputCapable {
	private inputSource: InputStream

	constructor(inputSource: InputStream) {
		super()
		this.inputSource = inputSource
	}

	onFunctionCall(item: FunctionCallItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalFunctionCall(source: Participant, item: FunctionCallItem): Promise<void> {
		return Promise.resolve()
	}

	onContextItem(source: Participant, item: ContextItem): Promise<void> {
		return Promise.resolve()
	}

	onFunctionCallOutput(item: FunctionCallOutputItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalFunctionCallOutput(source: Participant, item: FunctionCallOutputItem): Promise<void> {
		return Promise.resolve()
	}

	onReasoning(item: ReasoningItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalReasoning(source: Participant, item: ReasoningItem): Promise<void> {
		return Promise.resolve()
	}

	onModelMessage(item: ModelMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalModelMessage(source: Participant, item: ModelMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onMessage(message: string): Promise<void> {
		return Promise.resolve()
	}

	async streamInput(environment: AgenticEnvironment): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		const stream = this.inputSource.stream()
		for await (const message of stream) {
			await environment.deliverMessage(this, message)
		}
	}
}
