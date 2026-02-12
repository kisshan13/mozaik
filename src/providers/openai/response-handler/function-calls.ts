import { ResponseHandler } from "@core/endpoint/response-handler"
import { OpenAIDefaultClient } from "../client/default"
import { Tool } from "@/types/tool"
import { MozaikResponse } from "@core/response"
import { UsageEntry } from "@core/usage-entry"

export interface ToolCall {
	call_id: string
	name: string
	arguments: string | Record<string, any>
}

export interface ToolResult {
	type: "function_call_output"
	call_id: string
	output: string
}

export class FunctionCallsHandler extends ResponseHandler {
	nextHandler!: ResponseHandler
	client: OpenAIDefaultClient
	tools: Tool[]
	request: any

	constructor(request: any, tools: Tool[]) {
		super()
		this.request = request
		this.tools = tools
		this.client = new OpenAIDefaultClient()
	}

	private hasToolCalls(response: any): boolean {
		return response.output?.some((item: any) => item.type === "function_call")
	}

	private extractToolCalls(response: any): any[] {
		return response.output?.filter((item: any) => item.type === "function_call") || []
	}

	private resolveTool(call: ToolCall, tools: Tool[]): Tool | null {
		return tools.find((t) => t.name === call.name) ?? null
	}

	private async executeTool(tool: Tool, rawArgs: ToolCall["arguments"]): Promise<any> {
		const args = typeof rawArgs === "string" ? JSON.parse(rawArgs) : rawArgs

		return await tool.invoke(args)
	}

	private formatToolResult(callId: string, payload: any): ToolResult {
		return {
			type: "function_call_output",
			call_id: callId,
			output: JSON.stringify(payload),
		}
	}

	private async executeToolCalls(toolCalls: ToolCall[], tools: Tool[]): Promise<ToolResult[]> {
		const results: ToolResult[] = []

		for (const call of toolCalls) {
			const tool = this.resolveTool(call, tools)

			if (!tool) {
				results.push(
					this.formatToolResult(call.call_id, {
						error: `Unknown tool: ${call.name}`,
					}),
				)
				continue
			}

			try {
				const result = await this.executeTool(tool, call.arguments)
				results.push(this.formatToolResult(call.call_id, result))
			} catch (err: any) {
				results.push(
					this.formatToolResult(call.call_id, {
						error: err.message ?? "Tool execution failed",
					}),
				)
			}
		}

		return results
	}

	async handle(mozaikResponse: MozaikResponse): Promise<MozaikResponse> {
		let providerResponse = mozaikResponse.providerResponse
		let toolCallingResponse: any
		while (this.hasToolCalls(providerResponse)) {
			const toolCalls = this.extractToolCalls(providerResponse)

			const toolResults = await this.executeToolCalls(toolCalls, this.tools)

			// Continue the conversation with tool results
			this.request.input = toolResults
			this.request.previous_response_id = providerResponse.id

			toolCallingResponse = await this.client.send(this.request)


			const cachedInputTokens = toolCallingResponse.usage.input_token_details?.cached_tokens ?? 0
			const newInputTokens = toolCallingResponse.usage.input_tokens - cachedInputTokens
			const outputTokens = toolCallingResponse.usage.output_tokens

			mozaikResponse.addUsageEntry(
				new UsageEntry(
					newInputTokens,
					outputTokens,
					cachedInputTokens,
					toolCallingResponse.model,
				),
			)
			mozaikResponse.setProviderResponse(toolCallingResponse)
			mozaikResponse.setResponseData(toolCallingResponse)
			providerResponse = toolCallingResponse
		}

		return await this.nextHandler.handle(mozaikResponse)
	}
}
