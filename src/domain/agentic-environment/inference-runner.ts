import { ModelContext } from "@domain/model-context/model-context"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"

export interface InferenceRunner {
	run(
		context: ModelContext,
		model: GenerativeModel,
		signal?: AbortSignal,
	): AsyncIterable<ReasoningItem | FunctionCallItem | ModelMessageItem>
}
