import { Capability } from "./capabilities/capability"

export interface GenerativeModel<Id extends string> {
	readonly id: Id
	capabilities: Capability[]
}
