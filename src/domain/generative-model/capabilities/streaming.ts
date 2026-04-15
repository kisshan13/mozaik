import { Context } from "@core/context-runtime/context"
import { ContextItem } from "@core/context-runtime/context-item"

export interface Streaming {
	stream(context: Context): Promise<ContextItem[]>
}
