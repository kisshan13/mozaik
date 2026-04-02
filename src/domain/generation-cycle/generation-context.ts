import { GenerativeModel, TokenUsage } from "@generative-model/index"
import { StateId } from "@generation-cycle/state"

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
	currentState: StateId
	previousState: StateId | null
	status: GenerationStatus

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
	}

	isTerminal(): boolean {
		return this.status == GenerationStatus.COMPLETED || this.status == GenerationStatus.FAILED
	}
}
