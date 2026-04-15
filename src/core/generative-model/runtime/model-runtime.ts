import { Context } from "@core/context-runtime/context"
import { GenerativeModel } from "@core/generative-model/generative-model"
import { ContextItem } from "@core/context-runtime/context-item"

export interface ModelRuntime<Id extends string> {
	infer(model: GenerativeModel<Id>, context: Context): Promise<ContextItem[]>
}
