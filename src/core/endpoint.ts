import { Provider } from "@/core/provider"
import { BaseRequest } from "@core/request"
import { Model } from "@core/model"

export abstract class Endpoint {

    abstract provider: Provider
    
    constructor(readonly models: Set<string>) {}

    protected ensure(model: Model) {
      if (!this.models.has(model.name)) throw new Error("Model not supported")
    }

    abstract processRequest(req: BaseRequest): any

    async accept(req: BaseRequest): Promise<any> {
        const model = this.provider.registry.get(req.model)
        if (!model) throw new Error('Model doesn`t exist')

        this.ensure(model)
        return await this.processRequest(req)

        
    }
}

