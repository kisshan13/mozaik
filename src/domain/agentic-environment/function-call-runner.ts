import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"

export interface FunctionCallRunner {
	run(functionCallItem: FunctionCallItem, signal?: AbortSignal): AsyncIterable<FunctionCallOutputItem>
}
