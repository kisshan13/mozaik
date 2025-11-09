import { ModelProvider } from "./model-provider"

export abstract class ProviderResolver {
    abstract defaultProvider(): ModelProvider
    abstract resolve(model: string): ModelProvider
}