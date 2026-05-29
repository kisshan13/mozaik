import { GenerativeModel } from "@domain/generative-model/generative-model"
import { Tool } from "@domain/generative-model/tool"
import { DeepSeekReasoningEffort, DeepSeekReasoningEffortType } from "@infra/providers/deepseek/reasoning-effort"

export class DeepSeekV4Pro implements GenerativeModel {
	readonly specification = {
		name: "deepseek-v4-pro",
		supportReasoningEffort: true,
		defaultReasoningEffort: "high" as DeepSeekReasoningEffortType,
		supportStreaming: true,
		contextWindowSize: 1_000_000,
		maxOutputTokens: 384_000,
		supportFunctionCalling: true,
	}

	private tools: Tool[] = []

	private streaming: boolean = false

	private readonly effort: DeepSeekReasoningEffort = new DeepSeekReasoningEffort(
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

	setReasoningEffort(effort: DeepSeekReasoningEffortType): void {
		this.effort.setReasoningEffort(effort)
	}

	getReasoningEffort(): DeepSeekReasoningEffortType {
		return this.effort.getReasoningEffort()
	}
}
