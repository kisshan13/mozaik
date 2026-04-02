export class ModelPricing {
	constructor(
		private inputPricePer1MToken: number,
		private outputPricePer1MToken: number,
		private cachedPricePer1MToken: number,
	) {}

	getInputPricePer1MToken(): number {
		return this.inputPricePer1MToken
	}

	getOutputPricePer1MToken(): number {
		return this.outputPricePer1MToken
	}

	getCachedPricePer1MToken(): number {
		return this.cachedPricePer1MToken
	}
}
