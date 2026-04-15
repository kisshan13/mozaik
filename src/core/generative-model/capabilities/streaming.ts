import { GenerativeModel } from "@core/generative-model/generative-model"

export interface StreamingCapability {
	streaming: true
}

export type StreamingModel = GenerativeModel & StreamingCapability
