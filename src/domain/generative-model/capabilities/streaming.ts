import { GenerativeModel } from "src/domain/generative-model/generative-model"

export interface StreamingCapability {
	streaming: true
}

export type StreamingModel = GenerativeModel & StreamingCapability
