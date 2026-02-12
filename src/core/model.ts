import { UsageEntry } from "@core/usage-entry"

export abstract class Model {

    abstract modelName: string
    abstract inputPricePer1MToken: number
    abstract outputPricePer1MToken: number
    abstract cachedPricePer1MToken: number
    

    getModelName(): string {
        return this.modelName
    }

    calcTotalUsdCost(usage: UsageEntry): number {
        const inputCost = usage.newInputTokens * this.inputPricePer1MToken / 1_000_000
        const outputCost = usage.outputTokens * this.outputPricePer1MToken / 1_000_000
        const cachedCost = usage.cachedInputTokens * this.cachedPricePer1MToken / 1_000_000
        return inputCost + outputCost + cachedCost
    }
}