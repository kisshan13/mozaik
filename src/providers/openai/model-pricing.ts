export class OpenAIModelPricing {
	private inputPricePer1MToken!: number
	private outputPricePer1MToken!: number
	private cachedPricePer1MToken!: number

	calculateTotalCost(inputTokens: number, outputTokens: number, cachedInputTokens: number): number {
		const inputCost = ((inputTokens - cachedInputTokens) * this.inputPricePer1MToken) / 1_000_000
		const outputCost = (outputTokens * this.outputPricePer1MToken) / 1_000_000
		const cachedCost = (cachedInputTokens * this.cachedPricePer1MToken) / 1_000_000
		return inputCost + outputCost + cachedCost
	}

	getPriceInUsd(modelName: string, inputTokens: number, outputTokens: number, cachedInputTokens: number): number {
		if (modelName === "gpt-5-mini") {
			this.inputPricePer1MToken = 0.25
			this.outputPricePer1MToken = 2
			this.cachedPricePer1MToken = 0.025
			return this.calculateTotalCost(inputTokens, outputTokens, cachedInputTokens)
		} else if (modelName === "gpt-5-nano") {
			this.inputPricePer1MToken = 0.05
			this.outputPricePer1MToken = 0.4
			this.cachedPricePer1MToken = 0.005
			return this.calculateTotalCost(inputTokens, outputTokens, cachedInputTokens)
		} else if (modelName === "gpt-5.1") {
			this.inputPricePer1MToken = 1.25
			this.outputPricePer1MToken = 10
			this.cachedPricePer1MToken = 0.125
			return this.calculateTotalCost(inputTokens, outputTokens, cachedInputTokens)
		} else if (modelName === "gpt-5") {
			this.inputPricePer1MToken = 1.25
			this.outputPricePer1MToken = 10
			this.cachedPricePer1MToken = 0.125
			return this.calculateTotalCost(inputTokens, outputTokens, cachedInputTokens)
		}

		throw new Error(`Model name ${modelName} is not supported for this pricing`)
	}
}
