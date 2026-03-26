import { Inference } from "./inference"
import { ModelConfig } from "../model/config"
import { Tool } from "./tool"
import { Context } from "../context"

export class InferenceSession {
	private id: string
	private modelConfig: ModelConfig<unknown>
	private tools: Tool[] = []
	private context: Context
	private evolution: Inference[] = []

	constructor(
		id: string,
		modelConfig: ModelConfig<unknown>,
		tools: Tool[],
		context: Context,
		evolution: Inference[],
	) {
		this.id = id
		this.modelConfig = modelConfig
		this.tools = tools
		this.context = context
		this.evolution = evolution
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

	getEvolution(): Inference[] {
		return this.evolution
	}

	addInference(inference: Inference) {
		this.evolution.push(inference)
	}

	static create(modelConfig: ModelConfig<unknown>, tools: Tool[], context: Context) {
		const sessionId = crypto.randomUUID()
		const evolution: Inference[] = []
		return new InferenceSession(sessionId, modelConfig, tools, context, evolution)
	}
}
