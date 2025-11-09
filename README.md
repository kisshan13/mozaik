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
import 'dotenv/config'
import { gateway, InvocationRequest } from '@jigjoy-io/mosaic'

const request: InvocationRequest = {
    messages: [{
        role: 'system', 
        content: 'You are the weather assistent'
    }],
    prompt: 'What is the weather in Serbia',
    model: 'gpt-5'
}

const response = await gateway.invoke(request)
console.log(response)
```

## Author & License

Created by [JigJoy](https://jigjoy.io) team\
Licensed under the MIT License.
