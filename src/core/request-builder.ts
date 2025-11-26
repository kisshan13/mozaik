import { Message } from "@/types/message"

export abstract class RequestBuilder {

    request: any

    initialize(){
        this.request = {}
    }

    abstract addModel(model: string): RequestBuilder
    abstract addTask(task: string): RequestBuilder
    abstract addMessages(messages: Message[]): RequestBuilder
    abstract addStructuredOutput(schema: any): RequestBuilder

    build(){
        return this.request
    }

}