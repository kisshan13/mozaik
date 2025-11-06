import { ProviderName } from "@/types/provider"
import { Model } from "@core/model"

export class GPT5Nano extends Model {
    name = 'gpt-5-nano'
    provider = ProviderName.OPENAI
}

export class GPT5Mini extends Model {
    name = 'gpt-5-mini'
    provider = ProviderName.OPENAI
}