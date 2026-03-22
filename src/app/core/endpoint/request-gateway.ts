import { Context } from "@/domain/inference/context"
import { Endpoint } from "./endpoint"
import { EndpointResolver } from "./endpoint-resolver"

export class RequestGateway {
	endpoint!: Endpoint

	constructor(readonly endpointResolver: EndpointResolver) {}

	async invoke(context: Context): Promise<any> {
		this.endpoint = this.endpointResolver.resolve(context.model)
		return await this.endpoint.sendRequest(context)
	}
}
