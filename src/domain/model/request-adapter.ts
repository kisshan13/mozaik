import { ExecutionEvent } from "../runtime/execution-event"

export interface RequestAdapter<R> {
	map(event: ExecutionEvent): R
}
