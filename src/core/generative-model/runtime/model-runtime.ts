import { ContextItem } from "@core/context-runtime/context-item"
import { InferenceRequest } from "../inference-request"

export interface ModelRuntime {
	infer(request: InferenceRequest): Promise<ContextItem[]>
}
