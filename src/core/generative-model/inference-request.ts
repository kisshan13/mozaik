import { Context } from "@core/context-runtime/context"
import { GenerativeModel } from "./generative-model"

export class InferenceRequest {
	readonly model: GenerativeModel<string>
	readonly context: Context

	constructor(model: GenerativeModel<string>, context: Context) {
		this.model = model
		this.context = context
	}
}