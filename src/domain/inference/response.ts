import { UsageEntry } from "../usage-entry"

export class InferenceResponse {
	providerResponse: any
	responseData?: any
	usageEntries: UsageEntry[] = []

	setProviderResponse(providerResponse: any): InferenceResponse {
		this.providerResponse = providerResponse
		return this
	}

	addUsageEntry(usageEntry: UsageEntry): InferenceResponse {
		this.usageEntries.push(usageEntry)
		return this
	}

	setResponseData(response: any): InferenceResponse {
		this.responseData = response
		return this
	}

	getResponse(): any {
		return {
			data: this.responseData,
			usage: {
				entries: this.usageEntries,
			},
			totalCost: this.usageEntries.reduce((acc, entry) => acc + entry.priceInUsd, 0),
		}
	}

	getUsageEntries(): UsageEntry[] {
		return this.usageEntries
	}
}
