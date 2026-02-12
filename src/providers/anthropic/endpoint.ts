import { Endpoint } from "@core/endpoint/endpoint"
import { RequestBuilder } from "@core/endpoint/request-builder"
import { AnthropicRequestBuilder } from "./builder"
import { AnthropicClientResolver } from "./client/resolver"
import { ResponseHandler } from "@core/endpoint/response-handler"
import { ParsedOutputHandler } from "./response-handler/parsed-output"
import { ContentHandler } from "./response-handler/content"
import { ToolUseHandler } from "./response-handler/tool-use"
import { Command } from "@/types/command"
import { MozaikResponse } from "@core/response"
import { UsageHandler } from "./response-handler/usage"
import { UnhandledResponseHandler } from "./response-handler/undhandled"
import { UsageEntry } from "@core/usage-entry"
export class AnthropicEndpoint extends Endpoint {
	requestBuilder: RequestBuilder = new AnthropicRequestBuilder()

	async sendRequest(command: Command): Promise<any> {
		const request = this.buildRequest(command)
		const client = AnthropicClientResolver.resolve(request)
		const response = await client.send(request)

		const mozaikResponse = new MozaikResponse()
		mozaikResponse.setProviderResponse(response)

		// response handler (chain of responsibilities)
		const usageHandler: ResponseHandler = new UsageHandler()
		const toolUseHandler: ResponseHandler = new ToolUseHandler(request, command.tools ? command.tools : [])
		const parsedOutputHandler: ResponseHandler = new ParsedOutputHandler()
		const contentHandler: ResponseHandler = new ContentHandler()
		const unhandledResponseHandler: ResponseHandler = new UnhandledResponseHandler()

		usageHandler
			.setNextHandler(toolUseHandler)
			.setNextHandler(parsedOutputHandler)
			.setNextHandler(contentHandler)
			.setNextHandler(unhandledResponseHandler)

		const responseHandler = usageHandler

		const result = await responseHandler.handle(mozaikResponse)

		const usageEntries = result.getUsageEntries().map((e: UsageEntry) => ({
			inputTokens: e.inputTokens,
			cachedInputTokens: e.cachedInputTokens,
			outputTokens: e.outputTokens,
			model: e.model
		}))

		return {
			data: result.getResponse(),
			usage: {
				entries: usageEntries,
				totalUsdCost: 0
			}
		}
	}
}
