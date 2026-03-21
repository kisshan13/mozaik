import { SendingClient } from "@/app/core/endpoint/client"
import { AnthropicDefaultClient } from "./default"
import { AnthropicParserClient } from "./parser"

export class AnthropicClientResolver {
	static resolve(request: any): SendingClient {
		return request.output_format ? new AnthropicParserClient() : new AnthropicDefaultClient()
	}
}
