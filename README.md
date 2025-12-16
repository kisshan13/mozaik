# Mosaic

Mosaic is a TypeScript library for orchestrating AI agents, supporting both manually defined and AI-generated workflows.

---

## 📦 Installation

```bash
yarn add @jigjoy-io/mosaic
```

## API Key Configuration

Make sure to set your API keys in a `.env` file at the root of your project:

```env
# For OpenAI
OPENAI_API_KEY=your-openai-key-here

# For Anthropic Claude
ANTHROPIC_API_KEY=your-anthropic-key-here
```

## Supported Models

The system supports OpenAI models (gpt-5, gpt-5-mini, gpt-5-nano, gpt-5.1) and Anthropic Claude models (Claude Sonnet, Haiku, and Opus 4.5) out of the box.

---

## Features 

### AI Agents

This feature lets developers create AI agents through a single unified request definition, making it easy to compose tasks and leverage multiple models. You can mix providers, choose the best model for each task, and build agents that work across different capabilities.

```typescript
import 'dotenv/config'
import { Agent, Command } from '@jigjoy-io/mosaic'

const command: Command = {
    model: 'claude-sonnet-4.5'
}

const agent = new Agent(command)
const codingResponse = await agent.act('Write a React component for a todo list')
```

### Structured Output

Structured output lets you enforce exact response formats—using schemas like Zod—so AI returns predictable, validated data every time.

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

Multi-turn conversation allows developers to provide chat history so the AI agent can maintain context and generate more relevant, continuous responses.

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

### Tool Calling

Tool calling allows the agent to invoke real functions in your environment—letting it perform actual actions (like writing files, calling APIs, or modifying state) instead of merely generating text.

```typescript
import { promises as fs } from 'fs'
import { Agent, Command, Tool } from '@jigjoy-io/mosaic'

const tools: Tool[] = [
  {
    name: 'write_file',
    description: 'Write text to a file.',
    schema: {
      type: 'object',
      properties: {
        filename: { type: 'string' },
        content: { type: 'string' }
      },
      required: ['filename', 'content']
    },
    async invoke({ filename, content }) {
      await fs.writeFile(filename, content, 'utf8')
      return { ok: true }
    }
  }
]

const command: Command = {
    model: 'gpt-5.1',
    tools,
    messages: [
        {
            role: 'system',
            content: 'Save notes to disk using the tool, then confirm where the file was written.'
        }
    ],
    task: 'Create a two-bullet trip prep checklist for Belgrade and save it as trip-checklist.txt.'
}

const agent = new Agent(command)
await agent.act()
```

### Vision

Vision support allows AI agents to interpret images alongside text, enabling richer understanding and multimodal interactions.

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

### Parallel Task Execution

This example demonstrates how to use standard JavaScript/TypeScript concurrency (Promise.all) to run multiple AI agents in parallel and compare or combine their responses.

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

const task = 'What are the key differences between TypeScript and JavaScript?'

// Execute both agents in parallel using Promise.all()
const [openaiResponse, anthropicResponse] = await Promise.all([
    openaiAgent.act(task),
    anthropicAgent.act(task)
])
```

### Workflow

A workflow defines how tasks are executed together, either sequentially (one after another) or in parallel. Each task or workflow is a `WorkUnit`, which allows workflows to be composed and nested to build more complex execution pipelines.

```typescript
const workflow = new Workflow("sequential", [
  new Task("Analyze requirements", "gpt-5"),
  new Workflow("parallel", [
    new Task("Generate API schema", "gpt-5-mini"),
    new Task("Draft documentation", "gpt-5-nano")
  ]),
  new Task("Review and finalize", "gpt-5")
])

await workflow.execute()
```

### AI Autonomy

Developers can create autonomous agents using an AI planner agent. The planner works as a meta-agent: it breaks a high-level goal into smaller tasks, assigns each task to a specialized agent, and coordinates their execution through a workflow.

For example, given the goal `"Implement login functionality"`, the planner can generate the following workflow:

```typescript
Workflow(sequential, [
  Task("Design login form UI", "gpt-5"),
  Task("Implement authentication logic", "claude-sonnet-4.5"),
  Workflow(parallel, [
    Task("Add input validation", "gpt-5-mini"),
    Task("Style the login form", "gpt-5-nano")
  ]),
  Task("Write unit tests", "gpt-5")
])
```

### Autonomy Slider

By combining manually created workflows with the AI Planner, you can build hybrid workflows and control the level of autonomy, deciding which steps are fixed and which are planned automatically.

---

Working examples are available on the [GitHub repo](https://github.com/jigjoy-io/mosaic-examples).

---

If you’re building agentic systems and want to learn or connect with like-minded developers, join our [Discord](https://discord.gg/33uMhcerDU) where we share ideas and knowledge.

---

## Author & License

Created by [JigJoy](https://jigjoy.io) team  
Licensed under the MIT License.
