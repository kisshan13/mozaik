export class ModelConfig<T> {
	readonly modelName: string
	readonly parameters: T

	constructor(modelName: string, parameters: T) {
		this.modelName = modelName
		this.parameters = parameters
	}
}
