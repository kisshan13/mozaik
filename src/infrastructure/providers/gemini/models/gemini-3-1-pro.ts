import { GenerativeModel } from "@domain/generative-model/generative-model"
import { Tool } from "@domain/generative-model/tool"
import { GeminiReasoningEffort, GeminiReasoningEffortType } from "@infra/providers/gemini/reasoning-effort"

export class Gemini31Pro implements GenerativeModel {
	readonly specification = {
		name: "gemini-3.1-pro-preview",
		supportReasoningEffort: true,
		defaultReasoningEffort: "high" as GeminiReasoningEffortType,
		supportStreaming: true,
		contextWindowSize: 1_048_576,
		maxOutputTokens: 64_000,
		supportFunctionCalling: true,
	}

	private tools: Tool[] = []

	private streaming: boolean = false

	private readonly effort: GeminiReasoningEffort = new GeminiReasoningEffort(
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

	setReasoningEffort(effort: GeminiReasoningEffortType): void {
		this.effort.setReasoningEffort(effort)
	}

	getReasoningEffort(): GeminiReasoningEffortType {
		return this.effort.getReasoningEffort()
	}
}
