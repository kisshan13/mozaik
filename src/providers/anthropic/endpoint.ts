import { Endpoint } from "@core/endpoint"
import { RequestBuilder } from "@core/request-builder"
import { AnthropicRequestBuilder } from "./builder"
import Anthropic from "@anthropic-ai/sdk"

export class AnthropicEndpoint extends Endpoint {
	
	requestBuilder: RequestBuilder = new AnthropicRequestBuilder()

	constructor(private client = new Anthropic()) {
		super()
	}

	async sendRequest(request: any) {

		if(request.output_format){
			const response = await this.client.beta.messages.parse(request)
			return response.parsed_output
		}

		const response = await this.client.messages.create(request)

		// Extract text from content blocks
		return response.content
			.filter(block => block.type === 'text')
			.map(block => block.type === 'text' ? block.text : '')
			.join('')
	}
}
