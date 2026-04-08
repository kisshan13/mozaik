import { GenerativeModel, Usage } from "@generative-model/generative-model"

export class Context {
	prompt: string
	generatedOutput: unknown | null
	extractedOutput: unknown | null
	extractedTokenUsage: Usage | null
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

	getExtractedTokenUsage(): Usage | null {
		return this.extractedTokenUsage
	}

	getExtractedCost(): number | null {
		return this.extractedCost
	}

	setGeneratedOutput(generatedOutput: unknown): void {
		this.generatedOutput = generatedOutput
	}
}
