import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"

export interface ToolExecutor {
	produce(functionCallItem: FunctionCallItem, signal?: AbortSignal): AsyncIterable<FunctionCallOutputItem>
}
