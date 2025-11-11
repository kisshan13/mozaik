import { Endpoint } from "@core/endpoint"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIResponsesBuilder } from "./responses-builder"
import OpenAI from "openai"

export class OpenAIResponses extends Endpoint {
    // Default to Responses API
    requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()

    constructor(private client = new OpenAI()){
        super()
    }

    /**
     * Send request to OpenAI API
     * Auto-detects whether to use Responses API or Chat Completions API
     * based on request structure (presence of 'instructions' vs 'messages' field)
     */
    async sendRequest(providerRequest: any) {
        
        try {
            // Use the SDK's responses.create method
            // @ts-ignore - responses.create may not be in older SDK types
            const response = await this.client.responses.create(providerRequest)
            
            // Extract text from Responses API format
            // Response structure: { output_text, output: [...] }
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