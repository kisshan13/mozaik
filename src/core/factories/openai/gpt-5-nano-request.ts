import { OpenAIMapper } from "../../../mappers/oai-mapper"
import { CustomToolSpec } from "../../tool"
import { Descriptor } from "../../descriptor"
import { Message } from "../../message"
import { OpenAIRequest } from "./openai-request"
import OpenAI from "openai/index"

export class Gpt5NanoRequest {

    private oaiRequest: OpenAIRequest

    constructor(modelDescriptor: Descriptor, mapper = new OpenAIMapper(), private client = new OpenAI()){
        this.oaiRequest = new OpenAIRequest(modelDescriptor, mapper)
    }
  
    messages(messages: Message[]): Gpt5NanoRequest { 
        this.oaiRequest.messages(messages)
        return this
    }

    tools(tools: (CustomToolSpec | 'browse_internet')[]): Gpt5NanoRequest { 
        this.oaiRequest.tools(tools)
        return this
    }

    async send(){
        const request = this.oaiRequest.getRequest()
        return await this.client.chat.completions.create(request)
    }

}