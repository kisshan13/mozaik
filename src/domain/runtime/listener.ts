import { ExecutionEvent } from "./execution-event"

export type ListenerId = string

export interface Listener {
    listen(event: ExecutionEvent): void
}