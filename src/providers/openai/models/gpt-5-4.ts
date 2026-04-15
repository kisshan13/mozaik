import { Reasoning } from "@core/generative-model/capabilities/reasoning-effort"
import { GenerativeModel } from "@core/generative-model/generative-model"

export type GPT54 = GenerativeModel<"gpt-5.4"> & Reasoning<"xhigh" | "high" | "medium" | "low" | "none">

export const gpt54: GPT54 = {
	id: "gpt-5.4",
	reasoning: true,
	reasoningEfforts: ["xhigh", "high", "medium", "low", "none"],
}
