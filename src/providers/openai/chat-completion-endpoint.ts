import { Endpoint } from "@core/endpoint"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIChatCompletionBuilder } from "./chat-completion-builder"
import OpenAI from "openai"

export class ChatCompletionEndpoint extends Endpoint {
    requestBuilder: RequestBuilder = new OpenAIChatCompletionBuilder()

    constructor(private client = new OpenAI()){
        super()
    }

    async sendRequest(providerRequest: any) {
        const r = await this.client.chat.completions.create(providerRequest)
        
        return r.choices?.[0]?.message?.content ?? ""
    }
    
}