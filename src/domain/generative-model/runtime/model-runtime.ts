import { InferenceRequest } from "../inference-request"
import { InferenceResponse } from "../inference-response"

export interface ModelRuntime {
	infer(request: InferenceRequest): Promise<InferenceResponse>
}
