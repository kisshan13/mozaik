import { RuntimeContext } from "@domain/agent-loop/agent-loop"
import { InferenceResponse } from "@domain/generative-model/inference-response"

export interface InferenceVisitor {
	onStart(context: RuntimeContext): Promise<void>
	afterInference(inferenceResponse: InferenceResponse): Promise<void>
}
