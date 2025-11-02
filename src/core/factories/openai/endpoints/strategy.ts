import { Message } from "../../../message"
import { CustomToolSpec } from "../../../tool"

export abstract class EndpointStrategy {
    abstract setContext(messages: Message[]): EndpointStrategy
    abstract setTools(tools: CustomToolSpec[]): EndpointStrategy
    abstract send(): Promise<any>
}