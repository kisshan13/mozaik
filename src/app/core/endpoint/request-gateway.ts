import { InferenceRequest } from "@/domain/inference/inference-request"
import { Endpoint } from "./endpoint"
import { EndpointResolver } from "./endpoint-resolver"

export class RequestGateway {
	endpoint!: Endpoint

	constructor(readonly endpointResolver: EndpointResolver) {}

	async invoke(inferenceRequest: InferenceRequest): Promise<any> {
		this.endpoint = this.endpointResolver.resolve(inferenceRequest.model)
		return await this.endpoint.sendRequest(inferenceRequest)
	}
}
