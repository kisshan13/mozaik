import { GenerativeModel } from "@core/generative-model/generative-model"
import { ReasoningEffort } from "./reasoning-effort"

export interface StreamingCapability {
	streaming: true
}

export type StreamingModel<Id extends string> = GenerativeModel<Id> & ReasoningEffort<string> & StreamingCapability
