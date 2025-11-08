import { Endpoint } from "@core/endpoint"
import { OpenAIProvider } from "@providers/openai/sdk"
import { ChatRequest } from "@core/request"
import { OpenAIMapper } from "@providers/openai/mapper"
import OpenAI from "openai/index"
import { Provider } from "@core/provider"

export class ChatCompletion extends Endpoint {
    
    provider: Provider

    constructor(provider = new OpenAIProvider(), private client = new OpenAI(), private mapper = new OpenAIMapper()){
        const supportedModels = new Set(["gpt-5", "gpt-5-mini", "gpt-5-nano"])
        super(supportedModels)
        this.provider = provider
    }

    async processRequest(req: ChatRequest) {
        const oaiMsgs = this.mapper.toMessages(req.messages)
        oaiMsgs.push({
            role: 'user',
            content: req.prompt
        })
        
        const r = await this.client.chat.completions.create({
            model: req.model, 
            messages: oaiMsgs
        })
        
        return { text: r.choices?.[0]?.message?.content ?? "" }
    }
}