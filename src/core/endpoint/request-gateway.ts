import { MozaikRequest } from "@/types/inference-specification"
import { Endpoint } from "./endpoint"
import { EndpointResolver } from "./endpoint-resolver"

export class RequestGateway {
	endpoint!: Endpoint

	constructor(readonly endpointResolver: EndpointResolver) {}

	async invoke(request: MozaikRequest): Promise<any> {
		this.endpoint = this.endpointResolver.resolve(request.model)
		return await this.endpoint.sendRequest(request)
	}
}
