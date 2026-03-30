import { BaseEvent } from "../event/base"
import { Listener } from "../runtime/listener"
import { ToolCaller } from "../runtime/tool-caller"
import { Tool, ToolArgs, ToolInputProcessor } from "../runtime/tool"
import { ToolCallProcessor } from "../processor/tool-call"
import { InferenceRequestProcessor } from "../processor/inference-request"
import { ToolExecutedEvent } from "../event/tool-executed"
import { InferenceEndedEvent } from "../event/inference-ended"
import { UserMessageEvent } from "../event/user-message"
import { UserMessageProcessor } from "../processor/user-message"

export class Agent implements ToolCaller, Listener {
	readonly toolCallProcessor: ToolCallProcessor
	readonly inferenceRequestProcessor: InferenceRequestProcessor
	readonly inferenceArgs: ToolArgs

	constructor(
		private readonly id: string,
		toolCallProcessor: ToolCallProcessor,
		inferenceRequestProcessor: InferenceRequestProcessor,
		userMessageProcessor: UserMessageProcessor,
		inferenceArgs: ToolArgs,
	) {
		this.id = id
		this.toolCallProcessor = toolCallProcessor
		this.inferenceRequestProcessor = inferenceRequestProcessor
		this.inferenceArgs = inferenceArgs
	}

	getId(): string {
		return this.id
	}

	getToolCallProcessor(): ToolCallProcessor {
		return this.toolCallProcessor
	}

	callTool(tool: Tool, args: ToolArgs): Promise<unknown> {
		const toolInput: ToolInputProcessor = { tool, args }
		return this.toolCallProcessor.process(this.id, toolInput)
	}

	callInference(request: unknown): Promise<unknown> {
		return this.inferenceRequestProcessor.process(this.id, request)
	}

	toolExecutedListener(event: ToolExecutedEvent) {
		this.inferenceRequestProcessor.process(this.id, event)
	}

	inferenceEndedListener(event: InferenceEndedEvent) {
		const result = event.getResult()
		if (result.suggestedNextStep === "tool_call") {
			//this.toolCallProcessor.process(this.id, result.suggestion)
		} else if (event.getResult().suggestedNextStep === "respond_to_user") {
			//this.userMessageProcessor.process(this.id, event.getResult().rawResponse)
		}
	}

	userMessageListener(event: UserMessageEvent) {
		this.inferenceRequestProcessor.process(this.id, event)
	}
}
