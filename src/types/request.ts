import { Message } from "./messages"
import { OpenAIModels } from "./models"

export type InvocationRequest = {
    prompt: string,
    model: OpenAIModels,
    messages: Message[]
}