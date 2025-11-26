import { ZodObject } from "zod"
import { Message } from "./message"
import { Model } from "./model"

export type Command = {
    model: Model,
    messages?: Message[]
    task?: string
    structuredOutput?: ZodObject<any>
}