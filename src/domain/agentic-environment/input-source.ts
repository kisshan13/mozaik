import { DeveloperMessageItem } from "@domain/model-context/context-item/client-item/developer-message"
import { SystemMessageItem } from "@domain/model-context/context-item/client-item/system-message"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"

export interface InputItemSource {
	stream(signal?: AbortSignal): AsyncIterable<UserMessageItem | DeveloperMessageItem | SystemMessageItem>
}
