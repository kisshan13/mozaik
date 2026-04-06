import { GenerativeModel, TokenUsage } from "@generative-model/index"

export class Context {
	prompt: string
	generatedOutput: unknown | null
	extractedOutput: unknown | null
	extractedTokenUsage: TokenUsage | null
	extractedCost: number | null
	generativeModel: GenerativeModel

	constructor(generativeModel: GenerativeModel, prompt: string) {
		this.generativeModel = generativeModel
		this.prompt = prompt
		this.generatedOutput = null
		this.extractedOutput = null
		this.extractedTokenUsage = null
		this.extractedCost = null
	}

	getGenerativeModel(): GenerativeModel {
		return this.generativeModel
	}

	getPrompt(): string {
		return this.prompt
	}

	getGeneratedOutput(): unknown | null {
		return this.generatedOutput
	}

	getExtractedOutput(): unknown | null {
		return this.extractedOutput
	}

	getExtractedTokenUsage(): TokenUsage | null {
		return this.extractedTokenUsage
	}

	getExtractedCost(): number | null {
		return this.extractedCost
	}

	setGeneratedOutput(generatedOutput: unknown): void {
		this.generatedOutput = generatedOutput
	}
}
