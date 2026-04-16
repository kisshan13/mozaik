import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { GenerativeModel } from "@core/generative-model/generative-model"
import { OpenAIReasoningEffort, OpenAIReasoningEffortType } from "@openai/reasoning-effort"

export class Gpt54Mini implements GenerativeModel, ReasoningEffort<OpenAIReasoningEffortType> {
	readonly specification = {
		name: "gpt-5.4-mini",
		supportReasoningEffort: true,
		defaultReasoningEffort: "none" as OpenAIReasoningEffortType,
		supportStreaming: true,
		contextWindowSize: 400_000,
		maxOutputTokens: 128_000,
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
