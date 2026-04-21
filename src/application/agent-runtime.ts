import { Execution, ExecutionStatus } from "@domain/agnet-loop/execution"
import { AgentLoop, RuntimeContext } from "@domain/agnet-loop/loop"
import { StateId } from "@domain/agnet-loop/state/state"
import { Context } from "@domain/context/context"
import { UserMessage } from "@domain/context/input/user-message"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { GenerativeModel } from "@domain/generative-model/generative-model"

export class AgentRuntime {
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

export interface StateHandler {
	handle(runtimeContext: RuntimeContext): Promise<void>
}

export class UserMessageHandler implements StateHandler {
	async handle(runtimeContext: RuntimeContext): Promise<void> {}
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
