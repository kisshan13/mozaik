import { Endpoint } from "@core/endpoint"
import { TaskRequest } from "@core/request"
import { OpenAIProvider } from "../sdk"

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