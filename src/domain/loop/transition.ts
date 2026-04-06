import { Context } from "@loop/context"

export interface Transition {
	apply(Context: Context): Promise<void>
}
