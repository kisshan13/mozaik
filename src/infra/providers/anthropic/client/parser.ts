import { SendingClient } from "@/app/core/endpoint/client"
import Anthropic from "@anthropic-ai/sdk"

export class AnthropicParserClient implements SendingClient {
	constructor(private client = new Anthropic()) {}

	async send(request: any): Promise<any> {
		return await this.client.beta.messages.parse(request)
	}
}
