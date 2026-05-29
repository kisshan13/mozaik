import { describe, it, expect } from "@rstest/core"
import { ModelContext } from "@domain/model-context/model-context"
import { SystemMessageItem } from "@domain/model-context/context-item/client-item/system-message"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { InferenceRequest } from "@domain/generative-model/inference-request"
import { Tool } from "@domain/generative-model/tool"
import { Gpt55 } from "@infra/providers/openai/models/gpt-5-5"
import { OpenAICompatibleChatCompletions } from "@infra/providers/openai/runtime/openai-compatible-chat-completions"

// Pure conversion tests for the generic OpenAI-compatible Chat
// Completions runtime — no network call is made, only the
// ModelContext ⇄ chat.completions request/response mapping.
describe("OpenAICompatibleChatCompletions.mapContextToRequest", () => {
	it("maps a full conversation into OpenAI chat messages", () => {
		const context = ModelContext.create("project")
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

		const messages = new OpenAICompatibleChatCompletions().mapContextToRequest(context)

		// The tool call follows an assistant text message, so it attaches
		// to that same assistant message (valid OpenAI shape: content +
		// tool_calls together) rather than creating a second one.
		expect(messages).toEqual([
			{ role: "system", content: "You are a helpful assistant." },
			{ role: "user", content: "What is the weather in NYC?" },
			{
				role: "assistant",
				content: "Let me check.",
				tool_calls: [
					{
						id: "call_1",
						type: "function",
						function: { name: "get_weather", arguments: JSON.stringify({ city: "NYC" }) },
					},
				],
			},
			{ role: "tool", tool_call_id: "call_1", content: "Sunny, 22C" },
		])
	})

	it("merges consecutive parallel tool calls into ONE assistant message", () => {
		// This is the property a hand-rolled converter tends to get
		// wrong: two tool calls emitted in the same turn must become a
		// single assistant message with two `tool_calls`, each followed
		// by its `tool` result — otherwise OpenAI/DeepSeek 400 with
		// "insufficient tool messages following tool_calls".
		const context = ModelContext.create("project")
		context.addContextItem(UserMessageItem.create("Read two files."))
		context.addContextItem(
			FunctionCallItem.rehydrate({ callId: "call_a", name: "read", args: '{"path":"a.ts"}' }),
		)
		context.addContextItem(
			FunctionCallItem.rehydrate({ callId: "call_b", name: "read", args: '{"path":"b.ts"}' }),
		)
		context.addContextItem(FunctionCallOutputItem.create("call_a", "contents of a"))
		context.addContextItem(FunctionCallOutputItem.create("call_b", "contents of b"))

		const messages = new OpenAICompatibleChatCompletions().mapContextToRequest(context)

		expect(messages).toEqual([
			{ role: "user", content: "Read two files." },
			{
				role: "assistant",
				content: null,
				tool_calls: [
					{ id: "call_a", type: "function", function: { name: "read", arguments: '{"path":"a.ts"}' } },
					{ id: "call_b", type: "function", function: { name: "read", arguments: '{"path":"b.ts"}' } },
				],
			},
			{ role: "tool", tool_call_id: "call_a", content: "contents of a" },
			{ role: "tool", tool_call_id: "call_b", content: "contents of b" },
		])
	})
})

describe("OpenAICompatibleChatCompletions.buildRequest", () => {
	const toolFor = (name: string): Tool => ({
		type: "function",
		name,
		description: `invoke ${name}`,
		parameters: { type: "object", properties: {} },
		strict: true,
		invoke: async () => ({}),
	})

	it("sends model name + messages, and tools when the model has them", () => {
		const model = new Gpt55()
		model.setTools([toolFor("read")])
		const context = ModelContext.create("project").addContextItem(UserMessageItem.create("hi"))

		const request = new OpenAICompatibleChatCompletions().buildRequest(
			new InferenceRequest(model, context),
		)

		expect(request.model).toBe("gpt-5.5")
		expect(request.messages).toEqual([{ role: "user", content: "hi" }])
		expect(request.tools).toEqual([
			{
				type: "function",
				function: { name: "read", description: "invoke read", parameters: { type: "object", properties: {} } },
			},
		])
	})

	it("omits tools when the model has none", () => {
		const model = new Gpt55()
		const context = ModelContext.create("project").addContextItem(UserMessageItem.create("hi"))

		const request = new OpenAICompatibleChatCompletions().buildRequest(
			new InferenceRequest(model, context),
		)

		expect(request.tools).toBeUndefined()
	})

	it("emits standard reasoning_effort when the model supports it", () => {
		const model = new Gpt55() // supportReasoningEffort: true
		model.setReasoningEffort("high")
		const context = ModelContext.create("project").addContextItem(UserMessageItem.create("hi"))

		const request = new OpenAICompatibleChatCompletions().buildRequest(
			new InferenceRequest(model, context),
		)

		expect(request.reasoning_effort).toBe("high")
		// No vendor-only fields leak in for a plain endpoint.
		expect(request.thinking).toBeUndefined()
	})

	it("merges consumer extraBody, with standard fields taking precedence", () => {
		const model = new Gpt55()
		const context = ModelContext.create("project").addContextItem(UserMessageItem.create("hi"))

		const request = new OpenAICompatibleChatCompletions({
			extraBody: { thinking: { type: "enabled" }, model: "should-not-win" },
		}).buildRequest(new InferenceRequest(model, context))

		// Vendor quirk passed through...
		expect(request.thinking).toEqual({ type: "enabled" })
		// ...but the runtime's own `model` is not overwritten by extraBody.
		expect(request.model).toBe("gpt-5.5")
	})
})

describe("OpenAICompatibleChatCompletions response extraction", () => {
	const runtime = new OpenAICompatibleChatCompletions()

	it("extracts assistant text + tool calls into context items", () => {
		const items = runtime.extractContextItems({
			choices: [
				{
					message: {
						content: "Here you go.",
						tool_calls: [
							{ id: "call_1", type: "function", function: { name: "read", arguments: '{"path":"x"}' } },
						],
					},
				},
			],
		})

		expect(items).toHaveLength(2)
		expect((items[0] as any).toJSON()).toMatchObject({ type: "message" })
		expect((items[1] as any).toJSON()).toMatchObject({
			type: "function_call",
			name: "read",
			arguments: '{"path":"x"}',
		})
	})

	it("returns no items for an empty/missing message", () => {
		expect(runtime.extractContextItems({ choices: [] })).toEqual([])
		expect(runtime.extractContextItems({})).toEqual([])
	})

	it("maps token usage into a TokenUsage", () => {
		const usage = runtime.extractTokenUsage({
			usage: {
				prompt_tokens: 100,
				completion_tokens: 40,
				total_tokens: 140,
				prompt_tokens_details: { cached_tokens: 25 },
				completion_tokens_details: { reasoning_tokens: 12 },
			},
		})

		expect(usage?.inputTokens).toBe(100)
		expect(usage?.outputTokens).toBe(40)
		expect(usage?.totalTokens).toBe(140)
		expect(usage?.inputTokenDetails?.cached_tokens).toBe(25)
		expect(usage?.outputTokenDetails?.reasoning_tokens).toBe(12)
	})

	it("returns undefined token usage when the response has none", () => {
		expect(runtime.extractTokenUsage({})).toBeUndefined()
	})
})
