import { GenerativeModel } from "@core/generative-model/generative-model"

export interface Streaming {
	streaming: true
}

export type StreamingModel<Id extends string> = GenerativeModel<Id> & Streaming
