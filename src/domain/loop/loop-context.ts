import { GenerativeModel, TokenUsage } from "@generative-model/index"
import { StateId } from "src/domain/loop/loop-state"

export enum LoopStatus {
	TRIGGERED,
	RUNNING,
	COMPLETED,
	FAILED,
}

export class LoopContext {
	loopId: string
	prompt: string
	generatedOutput: unknown | null
	extractedOutput: unknown | null
	extractedTokenUsage: TokenUsage | null
	extractedCost: number | null
	generativeModel: GenerativeModel
	currentState: StateId
	previousState: StateId | null
	status: LoopStatus

	constructor(loopId: string, generativeModel: GenerativeModel, prompt: string) {
		this.loopId = loopId
		this.generativeModel = generativeModel
		this.previousState = null
		this.status = LoopStatus.TRIGGERED
		this.currentState = StateId.LOOP_START
		this.prompt = prompt
		this.generatedOutput = null
		this.extractedOutput = null
		this.extractedTokenUsage = null
		this.extractedCost = null
	}

	isTerminated(): boolean {
		return this.status == LoopStatus.COMPLETED || this.status == LoopStatus.FAILED
	}
}
