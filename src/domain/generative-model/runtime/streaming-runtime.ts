import { Context } from "src/domain/context/context"
import { StreamingModel } from "src/domain/generative-model/capabilities/streaming"
import { ContextItem } from "src/domain/context/context-item"

export interface StreamingRuntime {
	stream(model: StreamingModel, context: Context): AsyncIterable<ContextItem[]>
}
