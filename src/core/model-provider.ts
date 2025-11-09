import { InvocationRequest } from "@/types/request"
import { RequestBuilder } from "./request-builder"
import { CapabilityHandler } from "./handlers/capability"
import { MessagesHandler } from "./handlers/messages"
import { PromptHandler } from "./handlers/prompt"
import { ModelHandler } from "./handlers/model"

export abstract class ModelProvider {

    abstract requestBuilder: RequestBuilder

    buildRequest(request: InvocationRequest): any {

        this.requestBuilder.initialize()
        
        const messagesHandler: CapabilityHandler = new MessagesHandler()
        const promptHandler: CapabilityHandler = new PromptHandler()
        const modelHandler: CapabilityHandler = new ModelHandler()

        messagesHandler
            .setNextHandler(promptHandler)
            .setNextHandler(modelHandler)

        messagesHandler.handle(request, this.requestBuilder)

        return this.requestBuilder.build()
    }

    abstract sendRequest(providerRequest: any): any
}