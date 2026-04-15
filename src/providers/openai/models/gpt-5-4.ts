import { Capability } from "@core/generative-model/capabilities/capability"
import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { GenerativeModel } from "@core/generative-model/generative-model"

export const openaiReasoningEffort = new ReasoningEffort<"xhigh" | "high" | "medium" | "low" | "none">(["xhigh", "high", "medium", "low", "none"], "medium")

export class GPT54 implements GenerativeModel<"gpt-5.4"> {
	readonly id = "gpt-5.4"
	readonly capabilities: Capability[] = [openaiReasoningEffort]
}

export const gpt54 = new GPT54()