import { describe, it, expect } from "@rstest/core"
import { ModelContext } from "@domain/model-context/model-context"
import { SystemMessageItem } from "@domain/model-context/context-item/client-item/system-message"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { AnthropicMessages } from "@infra/providers/anthropic/runtime/anthropic-messages"

// Integration: a ModelContext assembled from domain items is mapped by the
// AnthropicMessages runtime into the shape the Anthropic Messages API expects.
// No network call is made — only the pure context-to-request mapping is tested.
describe("AnthropicMessages.mapContextToRequest (integration)", () => {
	it("maps a full conversation into Anthropic messages and a system prompt", () => {
		const context = ModelContext.create("integration-project")
		context.addContextItem(SystemMessageItem.create("You are a helpful assistant."))
		context.addContextItem(UserMessageItem.create("What is the weather in NYC?"))
		context.addContextItem(ModelMessageItem.rehydrate({ text: "Let me check." }))
		context.addContextItem(
			FunctionCallItem.rehydrate({
				callId: "call_1",
				name: "get_weather",
				args: JSON.stringify({ city: "NYC" }),
			}),
		)
		context.addContextItem(FunctionCallOutputItem.create("call_1", "Sunny, 22C"))

		const runtime = new AnthropicMessages()
		const { messages, system } = runtime.mapContextToRequest(context)

		expect(system).toBe("You are a helpful assistant.")

		expect(messages).toEqual([
			{ role: "user", content: [{ type: "text", text: "What is the weather in NYC?" }] },
			{
				role: "assistant",
				content: [
					{ type: "text", text: "Let me check." },
					{ type: "tool_use", id: "call_1", name: "get_weather", input: { city: "NYC" } },
				],
			},
			{ role: "user", content: [{ type: "tool_result", tool_use_id: "call_1", content: "Sunny, 22C" }] },
		])
	})

	it("omits the system prompt when no system or developer message is present", () => {
		const context = ModelContext.create("integration-project")
		context.addContextItem(UserMessageItem.create("Hello"))

		const { messages, system } = new AnthropicMessages().mapContextToRequest(context)

		expect(system).toBeUndefined()
		expect(messages).toEqual([{ role: "user", content: [{ type: "text", text: "Hello" }] }])
	})
})
