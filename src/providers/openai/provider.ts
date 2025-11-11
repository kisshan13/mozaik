import { ModelProvider } from "@core/model-provider"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIResponsesBuilder } from "./responses-builder"
import { OpenAIChatCompletionBuilder } from "./chat-completion-builder"
import OpenAI from "openai"

export class OpenAIProvider extends ModelProvider {
    // Default to Responses API
    requestBuilder: RequestBuilder = new OpenAIResponsesBuilder()
    
    // Keep legacy builder available if needed
    private legacyBuilder: RequestBuilder = new OpenAIChatCompletionBuilder()

    constructor(private client = new OpenAI()){
        super()
    }

    /**
     * Send request to OpenAI API
     * Auto-detects whether to use Responses API or Chat Completions API
     * based on request structure (presence of 'instructions' vs 'messages' field)
     */
    async sendRequest(providerRequest: any) {
        // Detect which API to use based on request structure
        if (this.isResponsesApiRequest(providerRequest)) {
            return this.sendResponsesRequest(providerRequest)
        } else {
            return this.sendChatCompletionRequest(providerRequest)
        }
    }

    private isResponsesApiRequest(request: any): boolean {
        // Responses API has 'instructions' field, Chat Completions has 'messages'
        return 'instructions' in request
    }

    /**
     * Send request to the Responses API endpoint
     * Uses client.responses.create() SDK method
     */
    private async sendResponsesRequest(providerRequest: any) {
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

    /**
     * Send request to the Chat Completions API (legacy endpoint)
     * This is the stable, widely-supported endpoint
     */
    private async sendChatCompletionRequest(providerRequest: any) {
        const r = await this.client.chat.completions.create(providerRequest)
        return r.choices?.[0]?.message?.content ?? ""
    }
    
}