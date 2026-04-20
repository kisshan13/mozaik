import { Context } from "@core/context/context"
import { GenerativeModel } from "./generative-model"
import { ReasoningEffort } from "./capabilities/reasoning-effort"
import { ToolCallingCapability } from "./capabilities/tool-calling"

export class InferenceRequest {
	readonly model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability
	readonly context: Context

	constructor(model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability, context: Context) {
		this.model = model
		this.context = context
	}
}
