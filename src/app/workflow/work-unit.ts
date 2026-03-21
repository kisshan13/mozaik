import { ExecutionHook } from "./hooks/execution-hook"

export abstract class WorkUnit {
	constructor() {}

	abstract execute(hook: ExecutionHook): Promise<any>
}
