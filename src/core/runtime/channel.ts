import { EffectHandler, InteractionHandler, MotionHandler } from "./handler"
import { Effect, Interaction, Motion } from "./interaction"

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
