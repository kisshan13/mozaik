import { BaseEvent } from "../event/base-event"

export type ListenerId = string

export interface Listener {
	listen(event: BaseEvent): void
}
