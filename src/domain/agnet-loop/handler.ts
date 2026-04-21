import { FunctionCallOutput } from "src/domain/context/input/function-call-output"
import { FunctionCall } from "src/domain/context/output/function-call"
import { UserMessage } from "src/domain/context/input/user-message"
import { InferenceRequest } from "src/domain/generative-model/inference-request"
import { ModelMessage } from "src/domain/context/output/model-message"

export interface UserMessageHandler {
	handle(sessionId: string, userMessage: UserMessage): Promise<void>
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
