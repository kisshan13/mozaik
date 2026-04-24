import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { Context } from "@domain/model-context/context"
import { Agent } from "./agent"

export class AgentSociety {
	private agents: Agent[] = []
	private isActive = false

	constructor(public name: string) {}

	join(agent: Agent) {
		this.agents.push(agent)
	}

	enter(
		messageText: string,
		model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability,
		context: Context,
	) {
		for (const agent of this.agents) {
			agent.run(messageText, model, context)
		}
	}

	async start() {
		this.isActive = true
		while (this.isActive) {
			await new Promise((resolve) => setTimeout(resolve, 100))
		}
	}

	stop() {
		this.isActive = false
	}
}
