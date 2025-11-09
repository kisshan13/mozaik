import { ProviderResolver } from "@core/provider-resolver"
import { ModelProvider } from "@core/model-provider"
import { OPENAI_MODELS } from "@/types/models"
import { OpenAIProvider } from "./openai/provider"

export class MosaicProviderResolver extends ProviderResolver {

    isOpenAIModel(value: string): boolean {
        return (OPENAI_MODELS as readonly string[]).includes(value)
    }
    
    defaultProvider(): ModelProvider {
        return new OpenAIProvider()
    }

    resolve(model: string): ModelProvider {
        if(this.isOpenAIModel(model)){
            return new OpenAIProvider()
        }
        throw new Error('Provider not found')
    }

}