import { ToolArgs } from "../runtime/tool"
import { ToolCallProcessor } from "../processor/tool-call"
import { InferenceProcessor } from "../processor/inference"
import { ToolExecutedEvent } from "../event/tool-executed"
import { InferenceEndedEvent } from "../event/inference-ended"
import { UserMessageEvent } from "../event/user-message"
import { MessageConnector } from "../connector/message-connector"
import { EventObserver } from "../communication/event-observer"

export class Agent implements EventObserver<InferenceEndedEvent | ToolExecutedEvent | UserMessageEvent> {
	readonly toolCallProcessor: ToolCallProcessor
	readonly inferenceProcessor: InferenceProcessor
	readonly inferenceArgs: ToolArgs
	readonly messageConnector: MessageConnector<unknown>

	constructor(
		private readonly id: string,
		toolCallProcessor: ToolCallProcessor,
		inferenceProcessor: InferenceProcessor,
		messageConnector: MessageConnector<unknown>,
		inferenceArgs: ToolArgs,
	) {
		this.id = id
		this.toolCallProcessor = toolCallProcessor
		this.inferenceProcessor = inferenceProcessor
		this.inferenceArgs = inferenceArgs
		this.messageConnector = messageConnector
	}


	onEvent(event: ToolExecutedEvent | InferenceEndedEvent | UserMessageEvent): void {
		
		if (event instanceof ToolExecutedEvent) {
			this.onToolExecuted(event)
		} else if (event instanceof InferenceEndedEvent) {
			this.onInferenceEnded(event)
		} else if (event instanceof UserMessageEvent) {
			this.onUserMessage(event)
		}
	}

	onToolExecuted(event: ToolExecutedEvent) {
		this.inferenceProcessor.process(this.id, event)
	}

	onInferenceEnded(event: InferenceEndedEvent) {
		const result = event.getResult()
		if (result.suggestedNextStep === "tool_call") {
			this.toolCallProcessor.process(this.id, result.tool, result.toolArgs)
		} else if (event.getResult().suggestedNextStep === "respond") {
			this.messageConnector.send(event.getResult().rawResponse)
		}
	}

	onUserMessage(event: UserMessageEvent) {
		this.inferenceProcessor.process(this.id, event)
	}
}
