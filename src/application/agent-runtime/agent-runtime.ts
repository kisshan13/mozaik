import { Execution, ExecutionStatus } from "@domain/agent-loop/execution"
import { AgentLoop, RuntimeContext } from "@domain/agent-loop/loop"
import { Context } from "@domain/model-context/context"
import { UserMessage } from "@domain/model-context/context-item/client-item/user-message"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { HookId, HooksRegistry } from "@app/agent-runtime/hooks-registry"

export class AgentRuntime {
	private hooksRegistry: HooksRegistry = new HooksRegistry()

	async on(hookId: HookId, callback: (data: any) => Promise<void>): Promise<void> {
		this.hooksRegistry.registerHandler(hookId, callback)
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
			try {
				const hookId = loop.entry(runtimeContext)
				if (!hookId) {
					throw new Error("Hook ID not found")
				}
				const handler = this.hooksRegistry.getHandler(hookId)

				await handler(runtimeContext)
			} catch (error) {
				execution.status = ExecutionStatus.FAILED
				break
			}

			const transition = loop.next(runtimeContext)
			await transition.apply(runtimeContext)
		}
	}
}
