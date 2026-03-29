import { ExecutionEvent } from "../runtime/execution-event"
import { ModelGateway } from "./gateway"
import { RequestAdapter } from "./request-adapter"

export class ModelAdapter {
	constructor(
		private readonly modelGateway: ModelGateway,
		private readonly requestAdapter: RequestAdapter<unknown>,
	) {}

	async adapt(event: ExecutionEvent): Promise<unknown> {
		const modelRequest = this.requestAdapter.map(event)
		const modelResponse = await this.modelGateway.generate(modelRequest)
		return modelResponse
	}
}
