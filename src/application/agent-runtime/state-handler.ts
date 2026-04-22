import { RuntimeContext } from "@domain/agnet-loop/loop"

export interface StateHandler {
	subscribe(event: string, callback: (data: any) => void): void
	unsubscribe(event: string, callback: (data: any) => void): void
	emit(event: string, data: any): void
	handle(runtimeContext: RuntimeContext): Promise<void>
}
