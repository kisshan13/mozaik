import { Context } from "@core/context-runtime/context"
import { GenerativeModel } from "./generative-model"
import { ReasoningEffort } from "./capabilities/reasoning-effort"

export class InferenceRequest {
	readonly model: GenerativeModel & ReasoningEffort<string>
	readonly context: Context

	constructor(model: GenerativeModel & ReasoningEffort<string>, context: Context) {
		this.model = model
		this.context = context
	}
}
