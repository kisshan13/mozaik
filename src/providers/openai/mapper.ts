import { Message } from "@/types/message"
import { Tool } from "@/types/tool"
import { ToolDefinition } from "@/types/openai-responses"

export class OpenAIResponsesMapper {

	/**
	 * Convert domain Messages to Responses API instructions format
	 * 
	 * The Responses API uses 'instructions' (system prompt) rather than messages array.
	 * For multi-turn conversations, use conversation.id or previous_response_id parameters.
	 */
	toInstructions(messages: Message[]): string {
		
		if (messages.length === 0) {
			throw new Error('[ResponsesMapper] Cannot create instructions from empty messages')
		}

		// Find system message if exists, otherwise use first user message as context
		const systemMessage = messages.find(m => m.role === 'system')
		
		if (systemMessage) {
			return typeof systemMessage.content === 'string' 
				? systemMessage.content 
				: this.extractTextFromContent(systemMessage.content)
		}

		// Fallback: create instructions from context
		return "You are a helpful assistant."
	}

	/**
	 * Extract the user's input from messages
	 * Returns the last user message content for use in prompt variables.
	 * In Responses API, the actual user query is typically passed via prompt variables
	 * or handled through conversation continuation.
	 */
	extractUserInput(messages: Message[]): string {

		const userMessages = messages.filter(m => m.role === 'user')
		
		if (userMessages.length === 0) {
			return ""
		}

		const lastUserMessage = userMessages[userMessages.length - 1]
		return typeof lastUserMessage.content === 'string'
			? lastUserMessage.content
			: this.extractTextFromContent(lastUserMessage.content)
	}

	private extractTextFromContent(content: any[]): string {
		return content
		.filter(part => part.type === 'text')
		.map(part => part.text)
		.join(' ')
	}

	/**
	 * Map tools to Responses API format
	 */
	toTools(tools: Tool[]): ToolDefinition[] {
		return tools.map(t => ({
		type: 'function',
		name: t.name,
		description: t.description,
		parameters: t.schema,
		strict: true  // Enable strict mode by default for better validation
		}))
	}
}
