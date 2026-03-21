export class UsageEntry {
	priceInUsd: number
	model: string

	constructor(priceInUsd: number, model: string) {
		this.priceInUsd = priceInUsd
		this.model = model
	}
}
