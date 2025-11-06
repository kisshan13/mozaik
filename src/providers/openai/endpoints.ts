import { Endpoint } from "@core/endpoint"
import { OpenAIProvider } from "@providers/openai/index"
import { ChatRequest, TaskRequest } from "@core/request"

export class ChatCompletion extends Endpoint {

    provider = new OpenAIProvider()

    constructor(){
        const supportedModels = new Set(["gpt-5-nano"])
        super(supportedModels)
    }

    async processRequest(req: ChatRequest) {
        return await this.provider.chatCompletion(req)
    }
}

export class Responses extends Endpoint {
    
    provider = new OpenAIProvider()

    constructor(){
        const supportedModels = new Set(["gpt-5-nano"])
        super(supportedModels)
    }

    async processRequest(req: TaskRequest) {
        return await this.provider.responses(req)
    }
}