import { FunctionCallOutput } from "@core/context/input/function-call-output"
import { FunctionCall } from "@core/context/output/function-call"
import { Tool } from "@core/generative-model/tool"
import { Effect, Interaction, Motion } from "./interaction"
import { EffectChannel } from "./channel"

export interface InteractionHandler<T> {
	on(sessionId: string, interaction: Interaction<T>): Promise<void>
}

export interface MotionHandler<T> extends InteractionHandler<T> {
	on(sessionId: string, motion: Motion<T>): Promise<void>
}

export interface EffectHandler<T> extends InteractionHandler<T> {
	on(sessionId: string, effect: Effect<T>): Promise<void>
}

export class FunctionCallHandler implements MotionHandler<FunctionCall> {
	private tools: Tool[]
	private effectChannel: EffectChannel<FunctionCallOutput>

	constructor(tools: Tool[], effectChannel: EffectChannel<FunctionCallOutput>) {
		this.tools = tools
		this.effectChannel = effectChannel
	}

	async on(sessionId: string, motion: Motion<FunctionCall>): Promise<void> {
		const functionCall = motion.data
		const tool = this.tools.find((tool) => tool.name === functionCall.name)
		if (!tool) {
			return
		}
		const result = await tool.invoke(functionCall.args)

		const effect = new Effect(FunctionCallOutput.create("function_call_executed", result))
		this.effectChannel.publish(sessionId, effect)
	}
}
