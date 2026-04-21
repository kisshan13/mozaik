import { RuntimeContext } from "../runtime"

export interface Transition {
	apply(context: RuntimeContext): Promise<void>
}
