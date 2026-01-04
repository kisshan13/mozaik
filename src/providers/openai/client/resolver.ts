import { SendingClient } from "@core/endpoint/client"
import { OpenAIDefaultClient } from "./default"
import { OpenAIParserClient } from "./parser"

export class OpenAIClientResolver {
	static resolve(request: any): SendingClient {
		if (request.text && request.text.format) {
			return new OpenAIParserClient()
		} else {
			return new OpenAIDefaultClient()
		}
	}
}
