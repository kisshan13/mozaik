# Mosaic

A tiny TypeScript library that lets you mix and match model capabilities behind a clean, consistent API. Currently, the library supports only the OpenAI Chat Completions endpoint.

---

## 📦 Installation

```bash
yarn add @jigjoy-io/mosaic
```
---

## API Key Configuration

Make sure to set your OpenAI API key in a `.env` file at the root of your project:

```env
OPENAI_API_KEY=your-api-key-here
```
---

## Quick Start

```typescript
import { ChatRequest, Endpoint } from '@jigjoy-io/mosaic/core'
import { ChatCompletion } from '@jigjoy-io/mosaic/providers/openai'
import 'dotenv/config'

const chat: ChatRequest = {
  messages: [{ role: 'system', content: 'You are the weather assistent' }],
  prompt: 'What is the weather in Serbia',
  model: 'gpt-5-nano'
}

const chatCompletion: Endpoint = new ChatCompletion()
const response = await chatCompletion.accept(chat)

console.log(response)
```

## Author & License

Created by [JigJoy](https://jigjoy.io) team\
Licensed under the MIT License.
