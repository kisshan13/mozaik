import { Context } from "@core/context/context"
import { StreamingModel } from "@core/generative-model/capabilities/streaming"
import { ContextItem } from "@core/context/context-item"

export interface StreamingRuntime {
	stream(model: StreamingModel, context: Context): AsyncIterable<ContextItem[]>
}
