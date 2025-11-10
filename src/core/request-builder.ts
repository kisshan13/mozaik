import { Message } from "@/types/message"

export abstract class RequestBuilder {

    request: any

    initialize(){
        this.request = {}
    }

    abstract addModel(model: string): RequestBuilder
    abstract addPrompt(prompt: string): RequestBuilder
    abstract addMessages(messages: Message[]): RequestBuilder

    build(){
        return this.request
    }

}