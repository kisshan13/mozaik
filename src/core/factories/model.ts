import { Descriptor } from "../descriptor"

export type Model<B> = {
    readonly desc: Descriptor
    request(): B // returns the model-specific request builder
}