import { FunctionCallOutput } from "@core/context/input/function-call-output"
import { FunctionCall } from "@core/context/output/function-call"
import { UserMessage } from "@core/context/input/user-message"
import { InferenceRequest } from "@core/generative-model/inference-request"
import { ModelMessage } from "@core/context/output/model-message"

export interface UserMessageHandler {
	handle(sessionId: string, userMessage: UserMessage): Promise<void>
}

export interface InferenceRequestHandler {
	handle(sssionId: string, inferenceRequest: InferenceRequest): Promise<FunctionCall | ModelMessage>
}

export interface FunctionCallHandler {
	handle(sessionId: string, functionCall: FunctionCall): Promise<FunctionCallOutput>
}

export interface ModelMessageHandler {
	handle(sessionId: string, modelMessage: ModelMessage): Promise<void>
}
