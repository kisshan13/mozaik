import { Mosaic } from "@/types/mosaic"
import { RequestBuilder } from "./request-builder"
import { CapabilityHandler } from "./handlers/capability"
import { MessagesHandler } from "./handlers/messages"
import { TaskHandler } from "./handlers/task"
import { ModelHandler } from "./handlers/model"
import { StructuredOutputlHandler } from "./handlers/structured-output"

export abstract class Endpoint {

    abstract requestBuilder: RequestBuilder

    buildRequest(request: Mosaic): any {

        this.requestBuilder.initialize()
        
        const messagesHandler: CapabilityHandler = new MessagesHandler()
        const taskHandler: CapabilityHandler = new TaskHandler()
        const modelHandler: CapabilityHandler = new ModelHandler()
        const structuredOutputHandler: CapabilityHandler = new StructuredOutputlHandler()

        messagesHandler
            .setNextHandler(taskHandler)
            .setNextHandler(modelHandler)
            .setNextHandler(structuredOutputHandler)

        messagesHandler.handle(request, this.requestBuilder)

        return this.requestBuilder.build()
    }

    abstract sendRequest(providerRequest: any): any
}