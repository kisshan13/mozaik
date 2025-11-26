import { Message } from "@/types/message"
import z from "zod"

export abstract class RequestBuilder {

    request: any

    initialize(){
        this.request = {}
    }

    abstract addModel(model: string): RequestBuilder
    abstract addTask(task: string): RequestBuilder
    abstract addMessages(messages: Message[]): RequestBuilder
    abstract addStructuredOutput(schema: z.ZodObject<any>): RequestBuilder

    build(){
        return this.request
    }

}