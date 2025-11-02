import { OpenAIMapper } from "../mapper"
import { Descriptor } from "../../../core/descriptor"
import { Message } from "../../../core/message"
import { CustomToolSpec } from "../../../core/tool"
import { EndpointStrategy } from "../../../core/strategy"
import OpenAI from "openai"

export class ChatCompletion extends EndpointStrategy {

    private request: any
    private client: OpenAI

    constructor(private modelDescriptor: Descriptor, private mapper = new OpenAIMapper()){
        super()
        this.request.model = this.modelDescriptor.model
        this.client = new OpenAI()
    }

    setContext(messages: Message[]): ChatCompletion { 
        const oaiMsgs = this.mapper.toMessages(messages)
        this.request = {
            ...this.request,
            messages: oaiMsgs
        }
        return this
    }

    setTools(tools: CustomToolSpec[]): ChatCompletion { 
        const oaiTools = this.mapper.toTools(tools)

        this.request = {
            ...this.request,
            tools: oaiTools,
            tool_choice: 'auto'
        }
        return this
    }

    send(): Promise<any> {
        return this.client.chat.completions.create(this.request)
    }

}