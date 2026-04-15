import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { GenerativeModel } from "@core/generative-model/generative-model"

export type OpenAIReasoningEffortType = "xhigh" | "high" | "medium" | "low" | "none"

export class OpenAIReasoningEffort implements ReasoningEffort<OpenAIReasoningEffortType> {
	reasoningEffort: OpenAIReasoningEffortType

	constructor(reasoningEffort: OpenAIReasoningEffortType) {
		this.reasoningEffort = reasoningEffort
	}

	setReasoningEffort(effort: OpenAIReasoningEffortType): void {
		this.reasoningEffort = effort
	}
	getReasoningEffort(): OpenAIReasoningEffortType {
		if (!this.reasoningEffort) {
			throw new Error("Reasoning effort not supported")
		}
		return this.reasoningEffort
	}
}

export class GPT54 implements GenerativeModel, ReasoningEffort<OpenAIReasoningEffortType> {
	readonly specification = {
		name: "gpt-5.4",
		supportReasoningEffort: true,
		defaultReasoningEffort: "none" as OpenAIReasoningEffortType,
		supportStreaming: true,
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
