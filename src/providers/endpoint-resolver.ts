import { EndpointResolver } from "@core/endpoint/endpoint-resolver"
import { Endpoint } from "@core/endpoint/endpoint"
import { OPENAI_MODELS, ANTHROPIC_MODELS } from "@/types/model"
import { OpenAIResponses } from "./openai/endpoint"
import { AnthropicEndpoint } from "./anthropic/endpoint"

export class DefaultEndpointResolver extends EndpointResolver {

    isOpenAIModel(value: string): boolean {
        return (OPENAI_MODELS as readonly string[]).includes(value)
    }

    isAnthropicModel(value: string): boolean {
        return (ANTHROPIC_MODELS as readonly string[]).includes(value)
    }

    resolve(model: string): Endpoint {
        
        if(this.isOpenAIModel(model)){
            return new OpenAIResponses()
        }else if(this.isAnthropicModel(model)){
            return new AnthropicEndpoint()
        }

        throw new Error('Provider not found')
    }

}