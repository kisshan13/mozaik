import { InferenceRequest } from "@domain/generative-model/inference-request"
import { InferenceResponse } from "@domain/generative-model/inference-response"

export interface ModelRuntime {
	infer(request: InferenceRequest): Promise<InferenceResponse>
}
