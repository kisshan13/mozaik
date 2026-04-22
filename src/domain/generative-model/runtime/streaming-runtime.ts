import { Context } from "@domain/context/context"
import { StreamingModel } from "@domain/generative-model/capabilities/streaming"
import { ContextItem } from "@domain/context/context-item"

export interface StreamingRuntime {
	stream(model: StreamingModel, context: Context): AsyncIterable<ContextItem[]>
}
