# Mosaic

A TypeScript library that provides a unified, provider-agnostic API for interacting with AI language models. Currently supports OpenAI's Chat Completions endpoint.

---

## Installation

```bash
yarn add @jigjoy-io/mosaic
```

---

## Key Purpose

Creates an abstraction layer between your application and AI model providers, allowing you to switch providers or models without changing your code.

---

## Architecture

### Core Components

1. **RequestGateway** - Main entry point that orchestrates requests
2. **ProviderResolver** - Determines which provider to use based on the model
3. **ModelProvider** - Abstract base for provider implementations (currently OpenAI)
4. **RequestBuilder** - Constructs provider-specific requests using chain-of-responsibility pattern
5. **Capability Handlers** - Modular handlers (messages, prompt, model) that build requests step-by-step

### How It Works

1. You submit an `InvocationRequest` with messages, prompt, and model
2. Gateway resolves the appropriate provider (OpenAI)
3. Provider builds the request through a chain of handlers
4. Request is sent to the AI provider's API
5. Response is returned as a simple string

### Design Patterns

- **Strategy Pattern** - Swappable providers
- **Chain of Responsibility** - Sequential request building through handlers
- **Builder Pattern** - Constructs complex request objects
- **Facade Pattern** - Single entry point for all AI interactions

### Extensibility

The architecture supports adding new providers (Anthropic, Google, etc.) by:
- Implementing `ModelProvider` abstract class
- Creating provider-specific `RequestBuilder` and mapper
- Registering in `ProviderResolver`

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
        content: 'You are a helpful weather assistant'
    }],
    prompt: 'What is the weather in Serbia?',
    model: 'gpt-4'
}

const response = await gateway.invoke(request)
console.log(response)
```

## 👥 Author & License

Created by [JigJoy](https://jigjoy.io) team  
Licensed under the MIT License.
