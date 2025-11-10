import { ProviderResolver } from "@core/provider-resolver"
import { ModelProvider } from "@core/model-provider"
import { OPENAI_MODELS, ANTHROPIC_MODELS } from "@/types/models"
import { OpenAIProvider } from "./openai/provider"
import { AnthropicProvider } from "./anthropic/provider"

export class MosaicProviderResolver extends ProviderResolver {

    isOpenAIModel(value: string): boolean {
        return (OPENAI_MODELS as readonly string[]).includes(value)
    }

    isAnthropicModel(value: string): boolean {
        return (ANTHROPIC_MODELS as readonly string[]).includes(value)
    }
    
    defaultProvider(): ModelProvider {
        return new OpenAIProvider()
    }

    resolve(model: string): ModelProvider {
        if(this.isOpenAIModel(model)){
            return new OpenAIProvider()
        }
        if(this.isAnthropicModel(model)){
            return new AnthropicProvider()
        }
        throw new Error('Provider not found')
    }

}