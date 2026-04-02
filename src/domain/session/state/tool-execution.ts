import { GoTo, SessionContext, State, StateId, Transition } from "../state"
import { Tool } from "../tool"

export interface ToolExecutionAdapter {
	execute(tool: Tool): Promise<unknown>
}

export class ToolExecution implements State {
	async run(sessionContext: SessionContext): Promise<Transition> {
		if (!sessionContext.selectedTool) {
			throw new Error("No tool selected")
		}

		//await this.toolExecutionAdapter.execute(sessionContext.selectedTool)

		return new GoTo(StateId.OUTPUT_INTERPRETATION)
	}
}
