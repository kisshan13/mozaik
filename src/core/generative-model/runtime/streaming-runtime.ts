import { Context } from "@core/context-runtime/context"
import { StreamingModel } from "@core/generative-model/capabilities/streaming"
import { ContextItem } from "@core/context-runtime/context-item"

export interface StreamingRuntime {
	stream(model: StreamingModel, context: Context): AsyncIterable<ContextItem[]>
}
