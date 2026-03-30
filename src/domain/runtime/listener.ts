import { InferenceEndedEvent } from "../event/inference-ended"
import { ToolExecutedEvent } from "../event/tool-executed"
import { UserMessageEvent } from "../event/user-message"

export type ListenerId = string

export interface Listener {
	toolExecutedListener(event: ToolExecutedEvent): void

	inferenceEndedListener(event: InferenceEndedEvent): void

	userMessageListener(event: UserMessageEvent): void
}
