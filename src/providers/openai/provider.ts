import { ModelProvider } from "@core/model-provider"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIRequestBuilder } from "./builder"
import OpenAI from "openai"

export class OpenAIProvider extends ModelProvider {
    requestBuilder: RequestBuilder = new OpenAIRequestBuilder()

    constructor(private client = new OpenAI()){
        super()
    }

    async sendRequest(providerRequest: any) {
        const r = await this.client.chat.completions.create(providerRequest)
        
        return r.choices?.[0]?.message?.content ?? ""
    }
    
}