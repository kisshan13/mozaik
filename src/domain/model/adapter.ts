import { InferenceResult } from "../inference-result"
import { ModelRequestMapper } from "./request-mapper"
import { InferenceSession } from "../agent"
import { ModelGateway } from "./gateway"

export class ModelAdapter {
	constructor(
		private readonly modelGateway: ModelGateway,
		private readonly requestMapper: ModelRequestMapper<unknown>,
	) {}

	async generate(session: InferenceSession): Promise<InferenceSession> {
		const modelRequest = this.requestMapper.map(session)
		const modelResponse = await this.modelGateway.generate(modelRequest)
		const contextSummary = ``
		const contextWindow = new ContextWindow(session.getContext().id, 0, 0, 0)
		const timestamp = new Date()
		const inferenceResult = new InferenceResult(contextSummary, contextWindow, timestamp, modelResponse)
		session.addInferenceResult(inferenceResult)
		return session
	}
}
