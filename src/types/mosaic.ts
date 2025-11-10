import { Message } from "./message"
import { Model } from "./model"

export type Mosaic = {
    model: Model,
    messages?: Message[]
    prompt?: string
}