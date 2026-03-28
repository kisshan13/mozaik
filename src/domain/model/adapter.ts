import { RequestAdapter } from "./request-adapter"
import { ModelGateway } from "./gateway"
import { Interaction } from "../hypervisor/interaction"

export class Inference {
	constructor(
		private readonly modelGateway: ModelGateway,
		private readonly requestAdapter: RequestAdapter<unknown>,
	) {}

	async execute(interaction: Interaction): Promise<unknown> {
		const modelRequest = this.requestAdapter.map(interaction)
		const modelResponse = await this.modelGateway.generate(modelRequest)
		return modelResponse
	}
}
