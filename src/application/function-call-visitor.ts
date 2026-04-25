import { RuntimeContext } from "@domain/agent-loop/loop"

export interface FunctionCallVisitor {
	beforeFunctionCall(context: RuntimeContext): Promise<void>
	afterFunctionCall(context: RuntimeContext): Promise<void>
}
