import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { InputCapable } from "@domain/agentic-environment/capabilities"
import { InputStream } from "@domain/agentic-environment/input-stream"
import { Participant } from "@domain/agentic-environment/participant"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"

export class BaseHumanParticipant extends Participant implements InputCapable {
	private inputSource: InputStream

	constructor(inputSource: InputStream) {
		super()
		this.inputSource = inputSource
	}

	onMessage(message: string) {}

	onFunctionCall(item: FunctionCallItem) {}

	onFunctionCallOutput(item: FunctionCallOutputItem) {}

	onReasoning(item: ReasoningItem) {}

	onModelMessage(item: ModelMessageItem) {}

	onExternalFunctionCall(source: Participant, item: FunctionCallItem) {}

	onExternalFunctionCallOutput(source: Participant, item: FunctionCallOutputItem) {}

	onExternalReasoning(source: Participant, item: ReasoningItem) {}

	onExternalModelMessage(source: Participant, item: ModelMessageItem) {}

	async streamInput(environment: AgenticEnvironment): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		const stream = this.inputSource.stream()
		for await (const message of stream) {
			await environment.deliverMessage(this, message)
		}
	}
}
