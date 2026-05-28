import { describe, it, expect } from "@rstest/core"
import { AnthropicReasoningEffort } from "@infra/providers/anthropic/reasoning-effort"

describe("AnthropicReasoningEffort", () => {
	it("returns the effort it was constructed with", () => {
		const effort = new AnthropicReasoningEffort("medium")

		expect(effort.getReasoningEffort()).toBe("medium")
	})

	it("updates the effort via setReasoningEffort()", () => {
		const effort = new AnthropicReasoningEffort("none")

		effort.setReasoningEffort("high")

		expect(effort.getReasoningEffort()).toBe("high")
	})

	it("throws when the effort is unset", () => {
		const effort = new AnthropicReasoningEffort("low")
		// Force an unset state to exercise the guard.
		effort.reasoningEffort = undefined as never

		expect(() => effort.getReasoningEffort()).toThrow("Reasoning effort not supported")
	})
})
