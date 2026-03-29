import { Interaction } from "../interaction/interaction"
import { ModelGateway } from "./gateway"
import { RequestAdapter } from "./request-adapter"

export class ModelAdapter {
	constructor(
		private readonly modelGateway: ModelGateway,
		private readonly requestAdapter: RequestAdapter<unknown>,
	) {}

	async adapt(interaction: Interaction<unknown>): Promise<unknown> {
		const modelRequest = this.requestAdapter.map(interaction)
		const modelResponse = await this.modelGateway.generate(modelRequest)
		return modelResponse
	}
}
