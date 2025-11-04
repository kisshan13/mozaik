export type CapabilityKind = "text" | "tools" | "vision" | "structured"

export interface Descriptor {
    model: string
    supports: ReadonlySet<CapabilityKind>
    contextWindow: number
    pricing: {
        type: string,
        input: number
        output: number 
    }
}