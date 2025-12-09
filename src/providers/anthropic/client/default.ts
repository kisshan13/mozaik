import { SendingClient } from "@core/endpoint/client"
import Anthropic from "@anthropic-ai/sdk"

export class AnthropicDefaultClient implements SendingClient {

    constructor(private client = new Anthropic()){}
    
    async send(request: any): Promise<any> {
        return await this.client.messages.create(request)
    }
}