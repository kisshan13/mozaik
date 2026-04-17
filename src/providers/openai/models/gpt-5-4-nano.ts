import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@core/generative-model/capabilities/tool-calling"
import { GenerativeModel } from "@core/generative-model/generative-model"
import { Tool } from "@core/generative-model/tool"
import { OpenAIReasoningEffort, OpenAIReasoningEffortType } from "@openai/reasoning-effort"

export class Gpt54Nano implements GenerativeModel, ReasoningEffort<OpenAIReasoningEffortType>, ToolCallingCapability {
	readonly specification = {
		name: "gpt-5.4-nano",
		supportReasoningEffort: true,
		defaultReasoningEffort: "none" as OpenAIReasoningEffortType,
		supportStreaming: true,
		contextWindowSize: 400_000,
		maxOutputTokens: 128_000,
		supportFunctionCalling: true,
	}

	private tools: Tool[] = []

	private readonly effort: OpenAIReasoningEffort = new OpenAIReasoningEffort(
		this.specification.defaultReasoningEffort,
	)

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
