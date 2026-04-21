import { ReasoningEffort } from "src/domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "src/domain/generative-model/capabilities/tool-calling"
import { GenerativeModel } from "src/domain/generative-model/generative-model"
import { Tool } from "src/domain/generative-model/tool"
import { OpenAIReasoningEffort, OpenAIReasoningEffortType } from "src/infrastructure/providers/openai/reasoning-effort"

export class Gpt54 implements GenerativeModel, ReasoningEffort<OpenAIReasoningEffortType>, ToolCallingCapability {
	readonly specification = {
		name: "gpt-5.4",
		supportReasoningEffort: true,
		defaultReasoningEffort: "none" as OpenAIReasoningEffortType,
		supportStreaming: true,
		contextWindowSize: 1_050_000,
		maxOutputTokens: 128_000,
		supportFunctionCalling: true,
	}

	private tools: Tool[] = []

	setTools(tools: Tool[]): void {
		this.tools = tools
	}

	getTools(): Tool[] {
		return this.tools
	}

	private readonly effort: OpenAIReasoningEffort = new OpenAIReasoningEffort(
		this.specification.defaultReasoningEffort,
	)

	setReasoningEffort(effort: OpenAIReasoningEffortType): void {
		this.effort.setReasoningEffort(effort)
	}
	getReasoningEffort(): OpenAIReasoningEffortType {
		return this.effort.getReasoningEffort()
	}
}
