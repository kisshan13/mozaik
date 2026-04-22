import { FunctionCallOutput } from "@domain/model-context/context-item/input/function-call-outputt
import { FunctionCall } from "@domain/model-context/context-item/output/function-calll
import { UserMessage } from "@domain/model-context/context-item/input/user-messagee
import { InferenceRequest } from "@domain/generative-model/inference-request"
import { ModelMessage } from "@domain/model-context/context-item/output/model-messagee

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
