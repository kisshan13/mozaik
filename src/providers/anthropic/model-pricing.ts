export class AnthropicModelPricing {
	private inputPricePer1MToken!: number
	private outputPricePer1MToken!: number

	calculateTotalCost(inputTokens: number, outputTokens: number): number {
		const inputCost = (inputTokens * this.inputPricePer1MToken) / 1_000_000
		const outputCost = (outputTokens * this.outputPricePer1MToken) / 1_000_000
		return inputCost + outputCost
	}

	getPriceInUsd(modelName: string, inputTokens: number, outputTokens: number): number {
		if (modelName.startsWith("claude-sonnet-4-5")) {
			this.inputPricePer1MToken = 3
			this.outputPricePer1MToken = 15
			return this.calculateTotalCost(inputTokens, outputTokens)
		} else if (modelName.startsWith("claude-haiku-4-5")) {
			this.inputPricePer1MToken = 1
			this.outputPricePer1MToken = 5
			return this.calculateTotalCost(inputTokens, outputTokens)
		} else if (modelName.startsWith("claude-opus-4-5")) {
			this.inputPricePer1MToken = 5
			this.outputPricePer1MToken = 25
			return this.calculateTotalCost(inputTokens, outputTokens)
		}

		throw new Error(`Model name ${modelName} is not supported for this pricing`)
	}
}
