import { InferenceSpecification } from "@/domain/types/inference-specification"
import { Endpoint } from "./endpoint"
import { EndpointResolver } from "./endpoint-resolver"

export class RequestGateway {
	endpoint!: Endpoint

	constructor(readonly endpointResolver: EndpointResolver) {}

	async invoke(inferenceSpecification: InferenceSpecification): Promise<any> {
		this.endpoint = this.endpointResolver.resolve(inferenceSpecification.model)
		return await this.endpoint.sendRequest(inferenceSpecification)
	}
}
