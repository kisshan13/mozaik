import { MotionChannel, EffectChannel, MotionHandler } from "./handler"
import { UserMessage } from "@core/context-runtime/input/user-message"
import { Motion } from "./interaction"
import { FunctionCall } from "@core/context-runtime/output/function-call"
import { Context } from "@core/context-runtime/context"
import { Gpt54 } from "@openai/models/gpt-5-4"
import { InferenceRequest } from "@core/generative-model/inference-request"
import { InferenceResponse } from "@core/generative-model/inference-response"

export class Agent implements MotionHandler<UserMessage> {
	private motionChannel: MotionChannel<InferenceRequest | FunctionCall>
	private effectChannel: EffectChannel<InferenceResponse>

	constructor() {
		this.motionChannel = new MotionChannel<InferenceRequest>()
		this.effectChannel = new EffectChannel<InferenceResponse>()
	}

	async on(sessionId: string, motion: Motion<UserMessage>): Promise<void> {
		console.log("Agent received user message:", motion.data.content.text)
		Context.create("123").addItem(motion.data)
		const gpt54 = new Gpt54()
		const inferenceRequest = new InferenceRequest(gpt54, Context.create("123"))

		const inferenceMotion = new Motion<InferenceRequest>(inferenceRequest)
		this.motionChannel.publish(sessionId, inferenceMotion)
	}
}

const agent = new Agent()
const userMessage = UserMessage.create("Hello, how are you?")
agent.on("123", new Motion<UserMessage>(userMessage))
