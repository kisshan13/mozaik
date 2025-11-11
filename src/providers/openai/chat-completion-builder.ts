import { Message } from "@/types/message"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIChatCompletionMapper } from "./chat-completion-mapper"

export class OpenAIChatCompletionBuilder extends RequestBuilder {

    constructor(private mapper = new OpenAIChatCompletionMapper()){
        super()

    }
    addModel(model: string): RequestBuilder {
        this.request.model = model
        return this
    }

    addTask(task: string): RequestBuilder {
        const message = {
            role: 'user',
            content: task
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