import { UsageEntry } from "./usage"

export class ResponseContext {
	providerResponse: any
	response?: any
	usageEntries: UsageEntry[] = []

	setProviderResponse(providerResponse: any): ResponseContext {
		this.providerResponse = providerResponse
		return this
	}

	addUsageEntry(usageEntry: UsageEntry): ResponseContext {
		this.usageEntries.push(usageEntry)
		return this
	}

	setResponse(response: any): ResponseContext {
		this.response = response
		return this
	}
}
