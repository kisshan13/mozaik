import { ZodObject } from "zod"
import { Message } from "./message"
import { Model } from "./model"
import { Tool } from "./tool"

export type MozaikRequest = {
	model: Model
	messages?: Message[]
	task?: string
	structuredOutput?: ZodObject<any>
	tools?: Tool[]
	reasoningEffort?: ReasoningEffort
}

export type ReasoningEffort = "none" | "low" | "medium" | "high" | "max"
