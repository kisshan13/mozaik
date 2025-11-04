import { OpenAIMapper } from "../mapper"
import { Descriptor } from "../../../core/descriptor"
import { Message } from "../../../core/message"
import { CustomToolSpec } from "../../../core/tool"
import { RuntimeStrategy } from "../../../core/runtime"
import OpenAI from "openai"

export class ChatCompletion extends RuntimeStrategy {

    private request: any = {}
    private client: OpenAI
    private tools: CustomToolSpec[] = []

    constructor(modelDescriptor: Descriptor, private mapper = new OpenAIMapper()){
        super()
        this.request.model = modelDescriptor.model
        this.client = new OpenAI()
    }

    setConversation(messages: Message[]): ChatCompletion { 
        const oaiMsgs = this.mapper.toMessages(messages)
        this.request = {
            ...this.request,
            messages: oaiMsgs
        }
        return this
    }

    setTools(tools: CustomToolSpec[]): ChatCompletion {
        this.tools = tools
        const oaiTools = this.mapper.toTools(tools)

        this.request = {
            ...this.request,
            tools: oaiTools,
            tool_choice: 'auto'
        }
        return this
    }

    async send(): Promise<any> {
        const r = await this.client.chat.completions.create(this.request)

        const aMsg = r.choices?.[0]?.message
        const calls = aMsg?.tool_calls ?? []
      
        return { 
            text: aMsg?.content ?? "", 
            toolCalls: calls
        }

    }

}