import { ModelRequestMapper } from "./request-mapper"
import { ModelGateway } from "./gateway"
import { Interaction } from "../hypervisor/interaction"

export class ModelAdapter {
	constructor(
		private readonly modelGateway: ModelGateway,
		private readonly requestMapper: ModelRequestMapper<unknown>,
	) {}

	async generate(interaction: Interaction): Promise<unknown> {
		const modelRequest = this.requestMapper.map(interaction)
		const modelResponse = await this.modelGateway.generate(modelRequest)
		return modelResponse
	}
}
