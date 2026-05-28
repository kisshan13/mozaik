import { describe, it, expect } from "@rstest/core"
import { ClaudeOpus47 } from "@infra/providers/anthropic/models/claude-4-7-opus"
import { Tool } from "@domain/generative-model/tool"

describe("ClaudeOpus47", () => {
	it("exposes the expected model specification", () => {
		const model = new ClaudeOpus47()

		expect(model.specification.name).toBe("claude-opus-4-7")
		expect(model.specification.supportStreaming).toBe(true)
		expect(model.specification.supportFunctionCalling).toBe(true)
		expect(model.specification.supportReasoningEffort).toBe(true)
		expect(model.specification.contextWindowSize).toBe(200_000)
	})

	it("defaults streaming off and toggles it", () => {
		const model = new ClaudeOpus47()

		expect(model.getStreaming()).toBe(false)

		model.setStreaming(true)

		expect(model.getStreaming()).toBe(true)
	})

	it("stores tools assigned to it", () => {
		const model = new ClaudeOpus47()
		const tools: Tool[] = [
			{
				type: "function",
				name: "get_weather",
				description: "Get weather",
				parameters: {},
				strict: true,
				invoke: async () => ({}),
			},
		]

		model.setTools(tools)

		expect(model.getTools()).toEqual(tools)
	})

	it("uses its default reasoning effort until overridden", () => {
		const model = new ClaudeOpus47()

		expect(model.getReasoningEffort()).toBe("none")

		model.setReasoningEffort("high")

		expect(model.getReasoningEffort()).toBe("high")
	})
})
