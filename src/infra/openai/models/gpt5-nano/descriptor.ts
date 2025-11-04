import { CapabilityKind, Descriptor } from "../../../../core/descriptor"

export class Gpt5NanoDescriptor implements Descriptor {

    readonly model = "gpt-5-nano"
    readonly supports = new Set<CapabilityKind>(["text","vision"])
    readonly contextWindow = 400_000
    readonly pricing = { 
        type: 'per-1m-tokens',
        input: 0.05, 
        output: 0.4 
    }
}