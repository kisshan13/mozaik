import { Endpoint } from "@core/endpoint"
import { RequestBuilder } from "@core/request-builder"
import { AnthropicRequestBuilder } from "./builder"
import { AnthropicClientResolver } from "./client/resolver"

export class AnthropicEndpoint extends Endpoint {
	
	requestBuilder: RequestBuilder = new AnthropicRequestBuilder()

	async sendRequest(request: any) {

		const client = AnthropicClientResolver.resolve(request)
		const response = await client.send(request)

		// structured output response handler
		if(request.output_format){
			return response.parsed_output
		}

		// content response handler
		return response.content
			.filter((block: any) => block.type === 'text')
			.map((block: any) => block.type === 'text' ? block.text : '')
			.join('')
	}
}
