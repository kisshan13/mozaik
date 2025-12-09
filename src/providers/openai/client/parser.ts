import OpenAI from "openai"
import { SendingClient } from "@core/endpoint/client"

export class OpenAIParserClient implements SendingClient {

    constructor(private client = new OpenAI()){}
    
    async send(request: any): Promise<any> {
        return await this.client.responses.parse(request)
    }
}