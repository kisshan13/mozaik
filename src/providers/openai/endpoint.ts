import { Endpoint } from "@core/endpoint"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIResponsesBuilder } from "./builder"
import { OpenAIClientResolver } from "./client/resolver"

export class OpenAIResponses extends Endpoint {
    requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()


    async sendRequest(request: any) {
        
        try {

            const client = OpenAIClientResolver.resolve(request)
            const response = await client.send(request)

            // structured output response handler
            if(response.output_parsed){
                return response.output_parsed
            }
            
            // default text response handler
            if (response.output_text) {
                return response.output_text
            }
            
            // content response handler
            const firstOutput = response.output?.[0]
            if (firstOutput && 'content' in firstOutput) {
                const firstContent = firstOutput.content?.[0]
                if (firstContent && 'text' in firstContent) {
                    return firstContent.text
                }
            }
            
            // empty response handler
            return ""
        } catch (error) {
            console.warn('[OpenAIProvider] Responses API request failed:', error)
            throw error
        }
    }

    
}