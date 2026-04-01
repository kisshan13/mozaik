import { Tool, ToolArgs } from "../session/tool"
import { Publisher } from "../communication/publisher"

export abstract class Processor extends Publisher {
	abstract process(initiator: string, tool: Tool, toolArgs: ToolArgs): Promise<void>
}
