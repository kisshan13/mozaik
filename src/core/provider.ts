import { Endpoint } from "@core/endpoint"
import { ModelRegistry } from "@core/model"

export abstract class Provider {

    abstract endpoints: Endpoint[]
    abstract registry: ModelRegistry

}