import { FunctionCallOutput } from "@core/context/input/function-call-output"
import { FunctionCall } from "@core/context/output/function-call"
import { Tool } from "@core/generative-model/tool"
import { Effect, Interaction, Motion } from "./interaction"

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

export interface Channel<T> {
	publish(sessionId: string, interaction: Interaction<T>): void
	subscribe(sessionId: string, handler: InteractionHandler<T>): void
}

export class MotionChannel<T> implements Channel<T> {
	private motionHandlers: Map<string, MotionHandler<T>> = new Map()

	publish(sessionId: string, motion: Motion<T>): void {
		const motionHandler = this.motionHandlers.get(sessionId)
		if (motionHandler) {
			motionHandler.on(sessionId, motion)
		}
	}

	subscribe(sessionId: string, handler: MotionHandler<T>): void {
		this.motionHandlers.set(sessionId, handler)
	}
}

export class EffectChannel<T> implements Channel<T> {
	private effectHandlers: Map<string, EffectHandler<T>> = new Map()

	publish(sessionId: string, effect: Effect<T>): void {
		const effectHandler = this.effectHandlers.get(sessionId)
		if (effectHandler) {
			effectHandler.on(sessionId, effect)
		}
	}

	subscribe(sessionId: string, effectHandler: EffectHandler<T>): void {
		this.effectHandlers.set(sessionId, effectHandler)
	}
}
