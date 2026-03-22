import { Context } from "./context"
import { Model } from "./model"
import { v4 as uuidv4 } from "uuid"

export type ReasoningEffort = "none" | "low" | "medium" | "high" | "max"

type InferenceIteration = {
	model: Model
	contextSummary: string
	contextWindow: ContextWindow
	reasoningEffort: ReasoningEffort
	response?: string
	timestamp: Date
}

export class Inference {
	private sessionId: string
	private model: Model
	private context: Context
	private contextWindow: ContextWindow
	private iterations: InferenceIteration[] = []
	private reasoningEffort: ReasoningEffort

	constructor(
		sessionId: string,
		model: Model,
		context: Context,
		contextWindow: ContextWindow,
		iterations: InferenceIteration[],
		reasoningEffort: ReasoningEffort,
	) {
		this.sessionId = sessionId
		this.model = model
		this.context = context
		this.contextWindow = contextWindow
		this.iterations = iterations
		this.reasoningEffort = reasoningEffort
	}

	getSessionId(): string {
		return this.sessionId
	}

	getModel(): Model {
		return this.model
	}

	setModel(model: Model) {
		this.model = model
	}

	getContext(): Context {
		return this.context
	}

	setContext(context: Context) {
		this.context = context
	}

	getReasoningEffort(): ReasoningEffort {
		return this.reasoningEffort
	}

	setReasoningEffort(reasoningEffort: ReasoningEffort) {
		this.reasoningEffort = reasoningEffort
	}

	getContextWindow(): ContextWindow {
		return this.contextWindow
	}

	setContextWindow(contextWindow: ContextWindow) {
		this.contextWindow = contextWindow
	}

	getIterations(): InferenceIteration[] {
		return this.iterations
	}

	addIteration(iteration: InferenceIteration) {
		this.iterations.push(iteration)
	}

	static create(model: Model, context: Context, effort?: ReasoningEffort) {
		const sessionId = uuidv4()
		const reasoningEffort = effort || model.defaultReasoningEffort
		const contextWindow = new ContextWindow(model.contextWindowCapacity, 0, 0, 0)
		return new Inference(sessionId, model, context, contextWindow, [], reasoningEffort)
	}
}
