import { GoTo, SessionContext, State, StateId, Transition } from "../state"
import { Tool } from "../tool"

export interface ToolExecutionAdapter {
	execute(tool: Tool): Promise<unknown>
}

export class ToolExecution implements State {
	private toolExecutionAdapter: ToolExecutionAdapter

	constructor(toolExecutionAdapter: ToolExecutionAdapter) {
		this.toolExecutionAdapter = toolExecutionAdapter
	}

	async run(sessionContext: SessionContext): Promise<Transition> {
		if (!sessionContext.selectedTool) {
			throw new Error("No tool selected")
		}

		await this.toolExecutionAdapter.execute(sessionContext.selectedTool)

		return new GoTo(StateId.RESPONSE_PROCESSING)
	}
}
