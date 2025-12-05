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
5. **Capability Handlers** - Modular handlers (messages, task, model) that build requests step-by-step

### How It Works

1. You create a `Command` object with messages and model
2. You instantiate an `Agent` with the `Command` object
3. You call `agent.act(task)` to send a request
4. Gateway resolves the appropriate provider (OpenAI or Anthropic)
5. Provider builds the request through a chain of handlers
6. Request is sent to the AI provider's API
7. Response is returned as a simple string

### Design Patterns

- **Strategy Pattern** - Swappable providers
- **Chain of Responsibility** - Sequential request building through handlers
- **Builder Pattern** - Constructs complex request objects
- **Facade Pattern** - Single entry point for all AI interactions

### Extensibility

The architecture supports adding new providers (Google, etc.) by:
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
- claude-sonnet-4.5
- claude-haiku-4.5
- claude-opus-4.5

---

## Quick Start

### OpenAI Example

```typescript
import 'dotenv/config'
import { Agent, Command } from '@jigjoy-io/mosaic'

const command: Command = {
    messages: [{
        role: 'system', 
        content: 'You are a helpful weather assistant'
    }],
    model: 'gpt-5'
}

const agent = new Agent(command)
const response = await agent.act('What is the weather in Serbia?')
console.log(response)
```

### Anthropic Claude Example

```typescript
import 'dotenv/config'
import { Agent, Command } from '@jigjoy-io/mosaic'

// Using Claude Sonnet 4.5 (latest, best for coding/vision)
const command: Command = {
    messages: [],
    model: 'claude-sonnet-4.5'
}

const agent = new Agent(command)
const codingResponse = await agent.act('Write a React component for a todo list')
```

## Usage Examples

### Simple Chat

```typescript
import { Agent, Command } from '@jigjoy-io/mosaic'

const command: Command = {
    messages: [],
    model: 'gpt-5-nano'
}

const agent = new Agent(command)
const response = await agent.act('Explain quantum computing in simple terms')
```

### Structured Output

```typescript
import { z } from 'zod'
import { Agent, Command } from '@jigjoy-io/mosaic'

const mealPlanSchema = z.object({
    calories: z.number(),
    meals: z.array(
        z.object({
            name: z.string(),
            description: z.string(),
            ingredients: z.array(z.string()).min(3)
        })
    ).length(3),
    shoppingList: z.array(z.string())
})

const command: Command = {
    model: 'gpt-5-mini',
    task: 'Create a 1-day vegetarian meal plan with breakfast, lunch, and dinner.',
    structuredOutput: mealPlanSchema
}

const agent = new Agent(command)
const response = await agent.act()
```

### Multi-turn Conversation

```typescript
import { Agent, Command } from '@jigjoy-io/mosaic'

const command: Command = {
    messages: [
        { role: 'system', content: 'You are a coding assistant' },
        { role: 'user', content: 'How do I sort an array in TypeScript?' },
        { role: 'assistant', content: 'You can use the .sort() method...' }
    ],
    model: 'claude-haiku-4.5'
}

const agent = new Agent(command)
const response = await agent.act('Can you show me an example?')
```

### Using Different Models

```typescript
import { Agent, Command } from '@jigjoy-io/mosaic'

// OpenAI GPT-5
const gptCommand: Command = {
    messages: [],
    model: 'gpt-5'
}
const gptAgent = new Agent(gptCommand)
const gptResponse = await gptAgent.act('Write a haiku about coding')

// Anthropic Claude Opus 4.5
const opusCommand: Command = {
    messages: [],
    model: 'claude-opus-4.5'
}
const opusAgent = new Agent(opusCommand)
const opusResponse = await opusAgent.act('Analyze this complex problem...')
```

### Parallel Task Execution

```typescript
import 'dotenv/config'
import { Agent, Command } from '@jigjoy-io/mosaic'

const openaiCommand: Command = {
    model: 'gpt-5'
}

const anthropicCommand: Command = {
    model: 'claude-sonnet-4.5'
}

const openaiAgent = new Agent(openaiCommand)
const anthropicAgent = new Agent(anthropicCommand)

const task = 'What are the key differences between TypeScript and JavaScript? Provide a concise answer.'

// Execute both agents in parallel using Promise.all()
const [openaiResponse, anthropicResponse] = await Promise.all([
    openaiAgent.act(task),
    anthropicAgent.act(task)
])
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
import { Agent, Command } from '@jigjoy-io/mosaic'

const command: Command = {
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
    model: 'claude-opus-4.5'
}

const agent = new Agent(command)
const response = await agent.act()
```

---

Working examples are available on the [GitHub repo](https://github.com/jigjoy-io/mosaic-examples).

---

## Author & License

Created by [JigJoy](https://jigjoy.io) team  
Licensed under the MIT License.