import { Context } from "./context"
import { Model } from "./model"
import { v4 as uuidv4 } from "uuid"

export type ReasoningEffort = "none" | "low" | "medium" | "high" | "max"

type Inference = {
	modelId: string
	contextSummary: string
	contextWindow: ContextWindow
	reasoningEffort: ReasoningEffort
	response?: string
	timestamp: Date
}

export class InferenceSession {
	private sessionId: string
	private model: Model
	private context: Context
	private inferences: Inference[] = []
	private reasoningEffort: ReasoningEffort

	constructor(
		sessionId: string,
		model: Model,
		context: Context,
		inferences: Inference[],
		reasoningEffort: ReasoningEffort,
	) {
		this.sessionId = sessionId
		this.model = model
		this.context = context
		this.inferences = inferences
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

	getInferences(): Inference[] {
		return this.inferences
	}

	addInference(inference: Inference) {
		this.inferences.push(inference)
	}

	static create(model: Model, context: Context, effort?: ReasoningEffort) {
		const sessionId = uuidv4()
		const reasoningEffort = effort || model.defaultReasoningEffort
		return new InferenceSession(sessionId, model, context, [], reasoningEffort)
	}
}
