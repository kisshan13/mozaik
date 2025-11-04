import 'dotenv/config'

import { Agent, gpt4Turbo, gpt5Reasoning } from "@jigjoy-io/mosaic"

// === Usage ===
const chatAgent = new Agent(gpt4Turbo)
const response = await chatAgent.conversation("Summarize this text.")
console.log(response)
// await chatAgent.execute("Research topic")         // ❌ compile-time error

const reasoningAgent = new Agent(gpt5Reasoning)
const response1 = await reasoningAgent.conversation("Hello!")
const response2 = await reasoningAgent.execute("Research and draft brief.")

console.log(response1)
console.log(response2)