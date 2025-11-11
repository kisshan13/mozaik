import { Endpoint } from "./endpoint"

export abstract class EndpointResolver {
    abstract resolve(model: string): Endpoint
}