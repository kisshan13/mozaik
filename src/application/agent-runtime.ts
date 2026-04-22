import { Execution, ExecutionStatus } from "@domain/agnet-loop/execution"
import { AgentLoop, RuntimeContext } from "@domain/agnet-loop/loop"
import { StateId } from "@domain/agnet-loop/state/state"
import { Context } from "@domain/context/context"
import { UserMessage } from "@domain/context/input/user-message"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { GenerativeModel } from "@domain/generative-model/generative-model"

export class AgentRuntime {
	on(event: string, callback: (data: any) => Promise<void>): void {
		const handler = StateHandlerRepository.getHandler(StateId.USER_MESSAGE_RECEIVED)
		handler.subscribe(event, callback)
	}
	async start(
		userMessage: UserMessage,
		model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability,
		context: Context,
	): Promise<void> {
		const execution = Execution.create()

		const loop = new AgentLoop()
		const runtimeContext: RuntimeContext = {
			execution,
			userMessage,
			model,
			context,
		}
		while (!execution.isTerminal()) {
			const currentStateId = execution.currentStateId

			try {
				const handler = StateHandlerRepository.getHandler(currentStateId)
				await handler.handle(runtimeContext)
			} catch (error) {
				execution.status = ExecutionStatus.FAILED
				break
			}

			const transition = loop.next(runtimeContext)
			await transition.apply(runtimeContext)
		}
	}
}

export interface EventEmitter {
	emit(event: string, data: any): void
}

export interface StateHandler {
	subscribe(event: string, callback: (data: any) => void): void
	unsubscribe(event: string, callback: (data: any) => void): void
	emit(event: string, data: any): void
	handle(runtimeContext: RuntimeContext): Promise<void>
}

export class UserMessageHandler implements StateHandler, EventEmitter {
	private subscribers: Map<string, (data: any) => void> = new Map<string, (data: any) => void>()

	subscribe(event: string, callback: (data: any) => void): void {
		console.log(`Event subscribed: ${event} with callback: ${callback}`)
		this.subscribers.set(event, callback)
	}
	unsubscribe(event: string, callback: (data: any) => void): void {
		console.log(`Event unsubscribed: ${event} with callback: ${callback}`)
	}
	emit(event: string, data: any): void {
		console.log(`Event emitted: ${event} with data: ${data}`)
		const callback = this.subscribers.get(event)
		if (callback) {
			callback(data)
		}
	}
	async handle(runtimeContext: RuntimeContext): Promise<void> {
		this.emit("userMessageReceived", runtimeContext.userMessage)
	}
}

export class StateHandlerRepository {
	private static handlers: Map<StateId, StateHandler> = new Map<StateId, StateHandler>()

	constructor() {
		StateHandlerRepository.handlers.set(StateId.USER_MESSAGE_RECEIVED, new UserMessageHandler())
	}

	static getHandler(stateId: StateId): StateHandler {
		const handler = this.handlers.get(stateId)
		if (!handler) {
			throw new Error(`Handler for state ${stateId} not found`)
		}
		return handler
	}
}
