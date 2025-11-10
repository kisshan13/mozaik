# Mosaic

A TypeScript library that provides a unified, provider-agnostic API for interacting with AI language models. Currently supports OpenAI and Anthropic Claude endpoints.

---

## 📦 Installation

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
3. **ModelProvider** - Abstract base for provider implementations (OpenAI, Anthropic)
4. **RequestBuilder** - Constructs provider-specific requests using chain-of-responsibility pattern
5. **Capability Handlers** - Modular handlers (messages, prompt, model) that build requests step-by-step

### How It Works

1. You submit an `InvocationRequest` with messages, prompt, and model
2. Gateway resolves the appropriate provider (OpenAI or Anthropic)
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

Make sure to set your API keys in a `.env` file at the root of your project:

```env
# For OpenAI
OPENAI_API_KEY=your-openai-key-here

# For Anthropic Claude
ANTHROPIC_API_KEY=your-anthropic-key-here
```

---

## Supported Models

The following models are supported out of the box. 

### OpenAI
- gpt-5
- gpt-5-mini
- gpt-5-nano

### Anthropic Claude
- claude-sonnet-4-5-20250929
- claude-haiku-4-5-20251001
- claude-opus-4-1-20250805

---

## Quick Start

### OpenAI Example

```typescript
import 'dotenv/config'
import { gateway, InvocationRequest } from '@jigjoy-io/mosaic'

const request: InvocationRequest = {
    messages: [{
        role: 'system', 
        content: 'You are a helpful weather assistant'
    }],
    prompt: 'What is the weather in Serbia?',
    model: 'gpt-5'
}

const response = await gateway.invoke(request)
console.log(response)
```

### Anthropic Claude Example

```typescript
import 'dotenv/config'
import { gateway } from '@jigjoy-io/mosaic'

// Using Claude Sonnet 4.5 (latest, best for coding/vision)
const codingResponse = await gateway.invoke({
    messages: [],
    prompt: 'Write a React component for a todo list',
    model: 'claude-sonnet-4-5-20250929'
})
```

## Usage Examples

### Simple Chat Completion

```typescript
import { gateway } from '@jigjoy-io/mosaic'

const response = await gateway.invoke({
    messages: [],
    prompt: 'Explain quantum computing in simple terms',
    model: 'gpt-5-nano'
})
```

### Multi-turn Conversation

```typescript
const response = await gateway.invoke({
    messages: [
        { role: 'system', content: 'You are a coding assistant' },
        { role: 'user', content: 'How do I sort an array in TypeScript?' },
        { role: 'assistant', content: 'You can use the .sort() method...' },
        { role: 'user', content: 'Can you show me an example?' }
    ],
    prompt: '',
    model: 'claude-haiku-4-5-20251001'
})
```

### Using Different Models

```typescript
// OpenAI GPT-5
const gptResponse = await gateway.invoke({
    messages: [],
    prompt: 'Write a haiku about coding',
    model: 'gpt-5'
})

// Anthropic Claude Opus 4
const opusResponse = await gateway.invoke({
    messages: [],
    prompt: 'Analyze this complex problem...',
    model: 'claude-opus-4-20250522'
})
```

---

## Important Notes

### Anthropic Image Support

When using Anthropic Claude models with images, note that:
- Images must be provided as base64-encoded data URLs
- Format: `data:image/[type];base64,[encoded-data]`
- Supported formats: JPEG, PNG, GIF, WebP
- Maximum size: 30MB per image, up to 20 images per request

Example:
```typescript
const response = await gateway.invoke({
    messages: [{
        role: 'user',
        content: [
            {
                type: 'image_url',
                url: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
            },
            {
                type: 'text',
                text: 'What is in this image?'
            }
        ]
    }],
    prompt: '',
    model: 'claude-opus-4-1-20250805'
})
```

---

## Author & License

Created by [JigJoy](https://jigjoy.io) team  
Licensed under the MIT License.
