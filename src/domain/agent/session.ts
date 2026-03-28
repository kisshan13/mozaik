import { InferenceResult } from "./inference-result"
import { ModelConfig } from "../model/config"
import { Tool } from "../hypervisor/tool"

export class InferenceSession {
	private id: string
	private modelConfig: ModelConfig<unknown>
	private tools: Tool[] = []
	private inferenceEvolution: InferenceResult<unknown>[] = []

	constructor(
		id: string,
		modelConfig: ModelConfig<unknown>,
		tools: Tool[],
		inferenceEvolution: InferenceResult<unknown>[],
	) {
		this.id = id
		this.modelConfig = modelConfig
		this.tools = tools
		this.inferenceEvolution = inferenceEvolution
	}

	getSessionId(): string {
		return this.id
	}

	getModelConfig(): ModelConfig<unknown> {
		return this.modelConfig
	}

	setModelConfig(modelConfig: ModelConfig<unknown>) {
		this.modelConfig = modelConfig
	}

	getTools(): Tool[] {
		return this.tools
	}

	setTools(tools: Tool[]) {
		this.tools = tools
	}

	getInferenceEvolution(): InferenceResult<unknown>[] {
		return this.inferenceEvolution
	}

	addInferenceResult(inference: InferenceResult<unknown>) {
		this.inferenceEvolution.push(inference)
	}

	static create(modelConfig: ModelConfig<unknown>, tools: Tool[]) {
		const sessionId = crypto.randomUUID()
		const evolution: InferenceResult<unknown>[] = []
		return new InferenceSession(sessionId, modelConfig, tools, evolution)
	}
}
