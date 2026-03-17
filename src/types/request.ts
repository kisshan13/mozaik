import { ZodObject } from "zod"
import { Message } from "./message"
import { Model } from "./model"
import { Tool } from "./tool"

export type MozaikRequest = {
	model: Model
	messages?: Message[]
	task?: string
	structuredOutput?: ZodObject<any>
	tools?: Tool[],
	reasoningEffort?: ReasoningEffort
}

export enum ReasoningEffort {
	NONE = "none",
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
	MAX = "max",
}
