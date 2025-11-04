import { CapabilityKind, Descriptor } from "../../../../core/descriptor"

export class Gpt5Descriptor implements Descriptor {

    readonly model = "gpt-5"
    readonly supports = new Set<CapabilityKind>(["text","vision"])
    readonly contextWindow = 400_000
    readonly pricing = { 
        type: 'per-1m-tokens',
        input: 1.25, 
        output: 10 
    }
}