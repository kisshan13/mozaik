import { GenerativeModel } from "@domain/generative-model/generative-model"

export interface StreamingCapability {
	setStreaming(streaming: boolean): void
	getStreaming(): boolean
}

export type StreamingModel = GenerativeModel & StreamingCapability
