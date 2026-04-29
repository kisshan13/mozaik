import { ModelContext } from "@domain/model-context/model-context"
import { AgenticEnvironment } from "./agentic-environment"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"

export interface InputCapable {
    streamInput(environment: AgenticEnvironment): Promise<void>
}
  
export interface InferenceCapable {
    runInference(
      environment: AgenticEnvironment,
      context: ModelContext,
      model: GenerativeModel,
      signal?: AbortSignal,
    ): Promise<void>
}
  
export interface FunctionCallCapable {
    executeFunctionCall(
      environment: AgenticEnvironment,
      functionCallItem: FunctionCallItem,
      signal?: AbortSignal,
    ): Promise<void>
}