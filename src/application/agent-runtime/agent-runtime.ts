import { Execution, ExecutionStatus } from "@domain/agnet-loop/execution"
import { AgentLoop, RuntimeContext } from "@domain/agnet-loop/loop"
import { StateId } from "@domain/agnet-loop/state/state"
import { Context } from "@domain/model-context/context"
import { UserMessage } from "@domain/model-context/context-item/client-item/user-message"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { StateHandlerRepository } from "@app/agent-runtime/state-handler-repository"

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
