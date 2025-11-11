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
     * based on request structure (presence of 'input' vs 'messages' field)
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
        // Responses API has 'input' field, Chat Completions has 'messages'
        return 'input' in request
    }

    /**
     * Send request to the new Responses API endpoint
     * Note: This endpoint is in preview and may require API access
     */
    private async sendResponsesRequest(providerRequest: any) {
        try {
            // Use new /v1/responses endpoint
            // Note: The OpenAI SDK may not support this natively yet
            const response = await this.client.post('/v1/responses', {
                body: providerRequest
            }) as any
            
            // Extract text from Responses API format
            return response.output?.[0]?.content?.[0]?.text ?? ""
        } catch (error) {
            // If Responses API fails, log and fall back to Chat Completions
            console.warn('[OpenAIProvider] Responses API request failed, consider using Chat Completions:', error)
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