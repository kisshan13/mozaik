import { ExecutionEvent } from "../event/base-event"

export interface RequestAdapter<R> {
	map(event: ExecutionEvent): R
}
