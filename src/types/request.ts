import { Message } from "./messages"
import { OpenAIModels, AnthropicModels } from "./models"

export type InvocationRequest = {
    prompt: string,
    model: OpenAIModels | AnthropicModels,
    messages: Message[]
}