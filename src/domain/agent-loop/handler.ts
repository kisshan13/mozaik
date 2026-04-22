import { FunctionCallOutput } from "@domain/model-context/context-item/client-item/function-call-output"
import { UserMessage } from "@domain/model-context/context-item/client-item/user-message"
import { InferenceRequest } from "@domain/generative-model/inference-request"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCall } from "@domain/model-context/context-item/model-item/function-call"

export interface UserMessageHandler {
	handle(executionId: string, userMessage: UserMessage): Promise<void>
}

export interface InferenceRequestHandler {
	handle(executionId: string, inferenceRequest: InferenceRequest): Promise<FunctionCall | ModelMessage>
}

export interface FunctionCallHandler {
	handle(executionId: string, functionCall: FunctionCall): Promise<FunctionCallOutput>
}

export interface ModelMessageHandler {
	handle(executionId: string, modelMessage: ModelMessage): Promise<void>
}
