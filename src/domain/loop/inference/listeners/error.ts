import { InferenceNotificationListener } from "src/domain/notifications/inference"
import { Context } from "@loop/context"

export class InferenceErrorListener implements InferenceNotificationListener {
	onNotification(Context: Context): void {
		console.log("Inference: Context updated", Context)
	}
}