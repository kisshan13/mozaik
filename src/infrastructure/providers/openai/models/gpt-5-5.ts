import { GenerativeModel } from "@domain/generative-model/generative-model"
import { Tool } from "@domain/generative-model/tool"
import { OpenAIReasoningEffort, OpenAIReasoningEffortType } from "@infra/providers/openai/reasoning-effort"

export class Gpt55 implements GenerativeModel {
	readonly specification = {
		name: "gpt-5.5",
		supportReasoningEffort: true,
		defaultReasoningEffort: "none" as OpenAIReasoningEffortType,
		supportStreaming: true,
		contextWindowSize: 1_050_000,
		maxOutputTokens: 128_000,
		supportFunctionCalling: true,
	}

	private tools: Tool[] = []

	private streaming: boolean = false

	private readonly effort: OpenAIReasoningEffort = new OpenAIReasoningEffort(
		this.specification.defaultReasoningEffort,
	)

	setStreaming(streaming: boolean): void {
		this.streaming = streaming
	}

	getStreaming(): boolean {
		return this.streaming
	}

	setTools(tools: Tool[]): void {
		this.tools = tools
	}

	getTools(): Tool[] {
		return this.tools
	}

	setReasoningEffort(effort: OpenAIReasoningEffortType): void {
		this.effort.setReasoningEffort(effort)
	}

	getReasoningEffort(): OpenAIReasoningEffortType {
		return this.effort.getReasoningEffort()
	}
}
