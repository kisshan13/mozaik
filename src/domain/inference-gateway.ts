import { Context } from "./context-runtime/context"
import { ContextItem } from "./context-runtime/context-item"

export interface InferenceGateway {
	infer(context: Context): Promise<(ContextItem | null)[]>
}
