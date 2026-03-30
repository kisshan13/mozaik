import { BaseEvent } from "../event/base"

export interface RequestAdapter<R> {
	map(event: BaseEvent): R
}
