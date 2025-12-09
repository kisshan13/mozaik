import OpenAI from "openai"
import { SendingClient } from "./client"

export class StructuredOutputClient implements SendingClient {

    constructor(private client = new OpenAI()){}
    
    async send(request: any): Promise<any> {
        return await this.client.responses.parse(request)
    }
}