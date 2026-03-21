import { EndpointResolver } from "@/app/core/endpoint/endpoint-resolver"
import { Endpoint } from "@/app/core/endpoint/endpoint"
import { OPENAI_MODELS, ANTHROPIC_MODELS } from "@/domain/types/model"
import { OpenAIResponses } from "./providers/openai/endpoint"
import { AnthropicEndpoint } from "./providers/anthropic/endpoint"

export class DefaultEndpointResolver extends EndpointResolver {
	isOpenAIModel(value: string): boolean {
		return (OPENAI_MODELS as readonly string[]).includes(value)
	}

	isAnthropicModel(value: string): boolean {
		return (ANTHROPIC_MODELS as readonly string[]).includes(value)
	}

	resolve(model: string): Endpoint {
		if (this.isOpenAIModel(model)) {
			return new OpenAIResponses()
		} else if (this.isAnthropicModel(model)) {
			return new AnthropicEndpoint()
		}

		throw new Error("Provider not found")
	}
}
