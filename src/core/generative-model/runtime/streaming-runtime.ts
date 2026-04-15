import { Context } from "@core/context-runtime/context"
import { StreamingModel } from "@core/generative-model/capabilities/streaming"
import { ContextItem } from "@core/context-runtime/context-item"

export interface StreamingRuntime<Id extends string> {
	stream(model: StreamingModel<Id>, context: Context): AsyncIterable<ContextItem[]>
}
