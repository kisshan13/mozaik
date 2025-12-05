import { Endpoint } from "@core/endpoint"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIResponsesBuilder } from "./responses-builder"
import OpenAI from "openai"

export class OpenAIResponses extends Endpoint {
    requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()

    constructor(private client = new OpenAI()){
        super()
    }


    async sendRequest(request: any) {
        
        try {

            if(request.text && request.text.format){
                const response = await this.client.responses.parse(request)
                return response.output_parsed
            }

            const response = await this.client.responses.create(request)
            
            if (response.output_text) {
                return response.output_text
            }
            
            // Fallback: extract from output array if output_text not available
            const firstOutput = response.output?.[0]
            if (firstOutput && 'content' in firstOutput) {
                const firstContent = firstOutput.content?.[0]
                if (firstContent && 'text' in firstContent) {
                    return firstContent.text
                }
            }
            
            return ""
        } catch (error) {
            console.warn('[OpenAIProvider] Responses API request failed:', error)
            throw error
        }
    }

    
}