import { ZodObject } from "zod"
import { Message } from "../types/message"
import { Model } from "../types/model"
import { Tool } from "../types/tool"

export type InferenceRequest = {
	model: Model
	messages?: Message[]
	task?: string
	structuredOutput?: ZodObject<any>
	tools?: Tool[]
	reasoningEffort?: ReasoningEffort
}

export type ReasoningEffort = "none" | "low" | "medium" | "high" | "max"
