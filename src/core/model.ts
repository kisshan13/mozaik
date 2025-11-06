import { ProviderName } from "@/types/provider"

export abstract class Model {
    abstract readonly name: string
    abstract readonly provider: ProviderName
}

export class ModelRegistry {

    models: Map<string, Model> = new Map()

    get(model: string): Model | undefined {
        return this.models.get(model)
    }

    register(model: Model){
        this.models.set(model.name, model)
    }
}
