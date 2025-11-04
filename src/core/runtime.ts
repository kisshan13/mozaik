import { Message } from "./message"
import { CustomToolSpec } from "./tool"

export abstract class RuntimeStrategy {
    abstract setConversation(messages: Message[]): RuntimeStrategy
    abstract setTools(tools: CustomToolSpec[]): RuntimeStrategy
    abstract send(): Promise<any>
}