import { GenerativeModel, TokenUsage } from "../generative-model"
import { Tool } from "./tool"

export enum StateId {
	CYCLE_START,
	INFERENCE,
	OUTPUT_EXTRACTION,
	OUTPUT_VALIDATION,
	OUTPUT_EXECUTION,
	OUTPUT_REJECTION,
	CYCLE_END,
}

export enum GenerationStatus {
	TRIGGERED,
	RUNNING,
	COMPLETED,
	FAILED,
}

export class GenerationContext {
	generationId: string
	prompt: string
	generatedOutput: unknown | null
	extractedOutput: unknown | null
	extractedTokenUsage: TokenUsage | null
	extractedCost: number | null
	generativeModel: GenerativeModel
	selectedTool: Tool | null
	currentState: StateId
	previousState: StateId | null
	status: GenerationStatus
	stepCount: number
	retryCounts: Map<StateId, number>

	constructor(generationId: string, generativeModel: GenerativeModel, prompt: string) {
		this.generationId = generationId
		this.generativeModel = generativeModel
		this.previousState = null
		this.status = GenerationStatus.TRIGGERED
		this.currentState = StateId.CYCLE_START
		this.prompt = prompt
		this.generatedOutput = null
		this.extractedOutput = null
		this.extractedTokenUsage = null
		this.extractedCost = null
		this.selectedTool = null
		this.stepCount = 0
		this.retryCounts = new Map<StateId, number>()
	}

	isTerminal(): boolean {
		return this.status == GenerationStatus.COMPLETED || this.status == GenerationStatus.FAILED
	}
}

export interface Transition {
	apply(generationContext: GenerationContext): Promise<void>
}

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.previousState = generationContext.currentState
		generationContext.currentState = this.next
		generationContext.stepCount++
	}
}

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.status = GenerationStatus.COMPLETED
	}
}

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(generationContext: GenerationContext): Promise<void> {
		generationContext.status = GenerationStatus.FAILED
	}
}

export interface State {
	run(generationContext: GenerationContext): Promise<Transition>
}
