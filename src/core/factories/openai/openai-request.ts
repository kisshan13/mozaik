import { OpenAIMapper } from "../../../mappers/oai-mapper"
import { ToolSpec } from "../../capabilities"
import { Descriptor } from "../../descriptor"
import { Message } from "../../message"

export class OpenAIRequest {

    private request: any

    constructor(private modelDescriptor: Descriptor, private mapper = new OpenAIMapper()){
        this.request.model = this.modelDescriptor.model
    }

    messages(messages: Message[]): OpenAIRequest { 
        const oaiMsgs = this.mapper.toMessages(messages)
        this.request = {
            ...this.request,
            messages: oaiMsgs
        }
        return this
    }

    tools(tools: ToolSpec[]): OpenAIRequest { 
        const oaiTools = this.mapper.toTools(tools)

        this.request = {
            ...this.request,
            tools: oaiTools,
            tool_choice: 'auto'
        }
        return this
    }

    getRequest(){
        return this.request
    }

}