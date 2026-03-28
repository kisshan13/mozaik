import { InferenceResult } from "./inference-result"
import { ModelConfig } from "../model/config"
import { Tool } from "./tool"
import { Context } from "../hypervisor/context"

export class InferenceSession {
	private id: string
	private modelConfig: ModelConfig<unknown>
	private tools: Tool[] = []
	private context: Context
	private inferenceEvolution: InferenceResult<unknown>[] = []

	constructor(
		id: string,
		modelConfig: ModelConfig<unknown>,
		tools: Tool[],
		context: Context,
		inferenceEvolution: InferenceResult<unknown>[],
	) {
		this.id = id
		this.modelConfig = modelConfig
		this.tools = tools
		this.context = context
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

	getContext(): Context {
		return this.context
	}

	setContext(context: Context) {
		this.context = context
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

	static create(modelConfig: ModelConfig<unknown>, tools: Tool[], context: Context) {
		const sessionId = crypto.randomUUID()
		const evolution: InferenceResult<unknown>[] = []
		return new InferenceSession(sessionId, modelConfig, tools, context, evolution)
	}
}
