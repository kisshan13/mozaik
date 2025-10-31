import { OpenAIMessageMapper } from "../../../mappers/openai/message-mapper"
import { ToolSpec } from "../../capabilities"
import { Descriptor } from "../../descriptor"
import { Message } from "../../message"

export enum ReasoningEffort {
    LOW='low',
    MEDIUM='medium',
    HIGH='high'
}

export class Gpt5NanoRequest {

    private request: any

    constructor(private modelDescriptor: Descriptor, private mapper = new OpenAIMessageMapper()){
        this.request.model = this.modelDescriptor.model
    }
  
    messages(messages: Message[]): Gpt5NanoRequest { 
        const oaiMsgs = this.mapper.toProvider(messages)
        this.request = {
            ...this.request,
            messages: oaiMsgs
        }
        return this
    }

    tools(tools: ToolSpec[]){ 
        const oaiTools = tools.map(t => ({ 
            type: "function", 
            function: { 
                name: t.name, 
                description: t.description, 
                parameters: t.schema 
            } 
        }))

        this.request = {
            ...this.request,
            tools: oaiTools
        }
        return this
    }

}