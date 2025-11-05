abstract class Endpoint{}

abstract class BaseModel {
    abstract readonly name: string
    abstract endpoints: Endpoint[]
}


abstract class NonReasoningModel extends BaseModel {
    readonly kind = "non-reasoning" as const
    // No reasoning controls here—by design.
}

abstract class ReasoningModel extends BaseModel {
    readonly kind = "reasoning" as const
    // Reasoning effort is part of the DNA
    readonly supportsReasoning = true as const
}

export class Gpt41 extends NonReasoningModel {
    readonly name = "gpt-4.1" as const
    endpoints: Endpoint[]

    constructor(endpoints: Endpoint[]){
        super()
        this.endpoints = endpoints
    }
    
}