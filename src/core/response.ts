import { UsageEntry } from "./usage-entry"

export class MozaikResponse {
	providerResponse: any
	responseData?: any
	usageEntries: UsageEntry[] = []

	setProviderResponse(providerResponse: any): MozaikResponse {
		this.providerResponse = providerResponse
		return this
	}

	addUsageEntry(usageEntry: UsageEntry): MozaikResponse {
		this.usageEntries.push(usageEntry)
		return this
	}

	setResponseData(response: any): MozaikResponse {
		this.responseData = response
		return this
	}

	getResponse(): any {
		return {
			data: this.responseData,
			usage: {
				entries: this.usageEntries
			}
		}
	}

	getUsageEntries(): UsageEntry [] {
		return this.usageEntries
	}
}
