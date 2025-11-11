import { EndpointResolver } from "@core/endpoint-resolver"
import { Endpoint } from "@core/endpoint"
import { OPENAI_MODELS, ANTHROPIC_MODELS } from "@/types/model"
import { OpenAIResponses } from "./openai/responses-endpoint"
import { AnthropicEndpoint } from "./anthropic/endpoint"

export class MosaicEndpointResolver extends EndpointResolver {

    isOpenAIModel(value: string): boolean {
        return (OPENAI_MODELS as readonly string[]).includes(value)
    }

    isAnthropicModel(value: string): boolean {
        return (ANTHROPIC_MODELS as readonly string[]).includes(value)
    }

    resolve(model: string): Endpoint {
        if(this.isOpenAIModel(model)){
            return new OpenAIResponses()
        }
        if(this.isAnthropicModel(model)){
            return new AnthropicEndpoint()
        }
        throw new Error('Provider not found')
    }

}