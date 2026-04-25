import { Context } from "@domain/model-context/model-context"
import { StreamingModel } from "@domain/generative-model/capabilities/streaming"
import { ContextItem } from "@domain/model-context/context-item/context-item"

export interface StreamingRuntime {
	stream(model: StreamingModel, context: Context): AsyncIterable<ContextItem[]>
}
