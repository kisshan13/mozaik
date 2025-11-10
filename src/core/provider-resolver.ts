import { ModelProvider } from "./model-provider"

export abstract class ProviderResolver {
    abstract resolve(model: string): ModelProvider
}