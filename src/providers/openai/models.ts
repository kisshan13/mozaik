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

export class GPT5 extends Model {
    name = 'gpt-5'
    provider = ProviderName.OPENAI
}

export class GPT41 extends Model {
    name = 'gpt-4.1'
    provider = ProviderName.OPENAI
}