import { FunctionCallOutput } from "@domain/context/input/function-call-output"
import { FunctionCall } from "@domain/context/output/function-call"
import { UserMessage } from "@domain/context/input/user-message"
import { InferenceRequest } from "@domain/generative-model/inference-request"
import { ModelMessage } from "@domain/context/output/model-message"

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
