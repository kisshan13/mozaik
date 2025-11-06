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
    model: 'gpt-5',
    steps: ["Analyze", "Plan", "Execute"]
}
chatCompletion.accept(chat)
responses.accept(task)