import { Command } from "@/types/command"
import { Endpoint } from "./endpoint"
import { EndpointResolver } from "./endpoint-resolver"

export class RequestGateway {
	endpoint!: Endpoint

	constructor(readonly endpointResolver: EndpointResolver) {}

	async invoke(command: Command): Promise<any> {
		this.endpoint = this.endpointResolver.resolve(command.model)
		return await this.endpoint.sendRequest(command)
	}
}
