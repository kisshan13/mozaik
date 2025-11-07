import { TaskRequest, ChatRequest, Endpoint } from '@jigjoy-io/mosaic/core'
import { Responses, ChatCompletion } from '@jigjoy-io/mosaic/providers/openai'

import 'dotenv/config'

const chat: ChatRequest = {
    messages: [{role: 'assistant', content: ''}],
    prompt: 'What is the capital of Serbia',
    model: 'gpt-5-nano'
}

const responses: Endpoint = new Responses()
const chatCompletion: Endpoint = new ChatCompletion()

const task: TaskRequest = {
    task: '',
    model: 'gpt-5-nano',
    steps: ["Analyze", "Plan", "Execute"]
}

await chatCompletion.accept(chat)
await responses.accept(task)