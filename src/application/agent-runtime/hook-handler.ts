import { RuntimeContext } from "@domain/agent-loop/loop"

export interface HookHandler {
	subscribe(event: string, callback: (data: any) => void): void
	unsubscribe(event: string, callback: (data: any) => void): void
	emit(event: string, data: any): void
	handle(runtimeContext: RuntimeContext): Promise<void>
}
