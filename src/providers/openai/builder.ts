import { Message } from "@/types/messages"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIMapper } from "./mapper"

export class OpenAIRequestBuilder extends RequestBuilder {

    constructor(private mapper = new OpenAIMapper()){
        super()

    }
    addModel(model: string): RequestBuilder {
        this.request.model = model
        return this
    }

    addPrompt(prompt: string): RequestBuilder {
        const message = {
            role: 'user',
            content: prompt
        }

        let messages = this.request.messages

        messages ? this.request.messages.push(message) : this.request.messages = [message]

        return this
    }

    addMessages(messages: Message[]): RequestBuilder {
        const oaiMsgs = this.mapper.toMessages(messages)
        this.request.messages = oaiMsgs

        return this
    }

}