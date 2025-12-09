import { Tool } from "@/types/tool"
import Anthropic from "@anthropic-ai/sdk"
import { ResponseHandler } from "@core/response-handler"
import { AnthropicDefaultClient } from "../client/default"

export class ParsedOutputHandler extends ResponseHandler {

    nextHandler!: ResponseHandler
    client: AnthropicDefaultClient

    constructor(){
        super()
        this.client = new AnthropicDefaultClient()
    }

    async handle(request: any, response: any) {


		while (response.stop_reason === 'tool_use') {
			const toolUseBlocks = response.content.filter(
				(block: any): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
			)

			// Add assistant's response to messages
			request.messages.push({
				role: 'assistant',
				content: response.content
			})

			// Execute tools and collect results
			const toolResults = await this.executeToolCalls(request.tools, toolUseBlocks)

			// Add tool results as user message
			request.messages.push({
				role: 'user',
				content: toolResults
			})

			// Call model again
			response = await this.client.send(request)
		}

        this.nextHandler.handle(request, response)
    }

    private async executeToolCalls(tools: Tool[], toolUseBlocks: Anthropic.ToolUseBlock[]): Promise<any[]> {
		const results: any[] = []

		for (const toolUse of toolUseBlocks) {
			const tool = tools?.find(t => t.name === toolUse.name)

			if (!tool) {
				results.push({
					type: 'tool_result',
					tool_use_id: toolUse.id,
					content: JSON.stringify({ error: `Unknown tool: ${toolUse.name}` })
				})
				continue
			}

			try {
				const result = await tool.invoke(toolUse.input)
				results.push({
					type: 'tool_result',
					tool_use_id: toolUse.id,
					content: JSON.stringify(result)
				})
			} catch (error: any) {
				results.push({
					type: 'tool_result',
					tool_use_id: toolUse.id,
					content: JSON.stringify({ error: error.message })
				})
			}
		}

		return results
	}
}