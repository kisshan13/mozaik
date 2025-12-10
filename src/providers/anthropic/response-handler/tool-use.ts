import { Tool } from "@/types/tool"
import Anthropic from "@anthropic-ai/sdk"
import { ResponseHandler } from "@core/response-handler"
import { AnthropicDefaultClient } from "../client/default"

export class ToolUseHandler extends ResponseHandler {

    nextHandler!: ResponseHandler
    client: AnthropicDefaultClient
	tools: Tool[]
	request: any

    constructor(request: any, tools: Tool[]){
        super()
		this.tools = tools
		this.request = request
        this.client = new AnthropicDefaultClient()
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

    async handle(response: any) {


		while (response.stop_reason === 'tool_use') {
			const toolUseBlocks = response.content.filter(
				(block: any): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
			)

			// Add assistant's response to messages
			this.request.messages.push({
				role: 'assistant',
				content: response.content
			})

			const toolResults = await this.executeToolCalls(this.tools, toolUseBlocks)

			// Add tool results as user message
			this.request.messages.push({
				role: 'user',
				content: toolResults
			})

			// Call model again
			response = await this.client.send(this.request)
		}

        return this.nextHandler.handle(response)
    }

}