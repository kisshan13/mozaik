import { Message, TextPart, ImagePart } from "@/domain/types/message"
import type { MessageParam, TextBlockParam, ImageBlockParam } from "@anthropic-ai/sdk/resources/messages"

export class AnthropicMapper {
	/**
	 * Transforms domain messages to Anthropic API format.
	 * Separates system messages from conversation messages.
	 */
	toMessages(messages: Message[]): { messages: MessageParam[]; system?: string } {
		const anthropicMessages: MessageParam[] = []
		let systemPrompt: string | undefined

		for (const msg of messages) {
			// Extract system messages separately (Anthropic uses dedicated system parameter)
			if (msg.role === "system") {
				const content =
					typeof msg.content === "string"
						? msg.content
						: (msg.content as TextPart[]).map((p) => p.text).join("\n")

				systemPrompt = systemPrompt ? `${systemPrompt}\n\n${content}` : content
				continue
			}

			// Skip tool role messages (not directly supported in basic implementation)
			if (msg.role === "tool") {
				continue
			}

			// Map user and assistant messages
			if (msg.role === "user" || msg.role === "assistant") {
				if (typeof msg.content === "string") {
					anthropicMessages.push({
						role: msg.role,
						content: msg.content,
					})
				} else {
					// Handle multimodal content (text + images)
					const contentBlocks = (msg.content as Array<TextPart | ImagePart>).map((part) => {
						if (part.type === "text") {
							return {
								type: "text" as const,
								text: part.text,
							} as TextBlockParam
						} else if (part.type === "image_url") {
							// Note: Anthropic requires base64-encoded images
							// This is a simplified version - production code should handle URL->base64 conversion
							const imageUrl = part.url

							// Check if it's already base64 data
							if (imageUrl.startsWith("data:image")) {
								const matches = imageUrl.match(/data:image\/(\w+);base64,(.+)/)
								if (matches) {
									const [, mediaType, data] = matches
									return {
										type: "image" as const,
										source: {
											type: "base64" as const,
											media_type: `image/${mediaType}` as
												| "image/jpeg"
												| "image/png"
												| "image/gif"
												| "image/webp",
											data,
										},
									} as ImageBlockParam
								}
							}

							// For non-base64 URLs, throw error (or you could fetch and convert)
							throw new Error(
								"[AnthropicMapper] Image URLs must be base64-encoded. " +
									"Convert to data:image/[type];base64,[data] format.",
							)
						}

						return { type: "text" as const, text: "" } as TextBlockParam
					})

					anthropicMessages.push({
						role: msg.role,
						content: contentBlocks,
					})
				}
			}
		}

		// Anthropic requires alternating user/assistant roles
		// Validate and fix if needed
		const validated = this.ensureAlternatingRoles(anthropicMessages)

		return {
			messages: validated,
			system: systemPrompt,
		}
	}

	/**
	 * Ensures messages alternate between user and assistant roles.
	 * Anthropic API requires this constraint.
	 */
	private ensureAlternatingRoles(messages: MessageParam[]): MessageParam[] {
		if (messages.length === 0) return messages

		const result: MessageParam[] = []
		let lastRole: "user" | "assistant" | undefined

		for (const msg of messages) {
			// If same role appears consecutively, merge the messages
			if (lastRole === msg.role && result.length > 0) {
				const lastMsg = result[result.length - 1]

				// Merge content
				if (typeof lastMsg.content === "string" && typeof msg.content === "string") {
					lastMsg.content = `${lastMsg.content}\n${msg.content}`
				} else {
					// For array content, concatenate
					const lastContent = Array.isArray(lastMsg.content)
						? lastMsg.content
						: [{ type: "text" as const, text: lastMsg.content as string }]
					const newContent = Array.isArray(msg.content)
						? msg.content
						: [{ type: "text" as const, text: msg.content as string }]
					lastMsg.content = [...lastContent, ...newContent]
				}
			} else {
				result.push(msg)
				lastRole = msg.role
			}
		}

		// Ensure first message is from user (Anthropic requirement)
		if (result.length > 0 && result[0].role !== "user") {
			throw new Error(
				"[AnthropicMapper] First message must be from user. Anthropic API requires conversations to start with a user message.",
			)
		}

		return result
	}
}
