import { Message } from "@/types/message"
import { ToolSpec } from "@/types/tools"
import { ZodObject } from "zod"

export abstract class RequestBuilder {

    request: any

    initialize(){
        this.request = {}
    }

    abstract addModel(model: string): RequestBuilder
    abstract addTask(task: string): RequestBuilder
    abstract addMessages(messages: Message[]): RequestBuilder
    abstract addStructuredOutput(schema: ZodObject<any>): RequestBuilder
    abstract addTools(tools: ToolSpec[]): RequestBuilder

    build(){
        return this.request
    }

}