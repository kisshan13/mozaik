
import { Tool, ToolArgs } from "../runtime/tool"
import { Publisher } from "../communication/publisher"

export abstract class Processor extends Publisher {

	abstract process(initiator: string, tool: Tool, toolArgs: ToolArgs): Promise<void>
}
