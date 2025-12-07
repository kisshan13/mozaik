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
- gpt-5.1

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

## Workflow, Task, and Planning Agent Guide

Mosaic provides a powerful workflow system that enables autonomous agent execution through intelligent planning and task orchestration. This guide explains how to use the `PlanningAgent` to break down complex goals into executable workflows.

### Core Concepts

#### 1. **WorkUnit** (Base Abstraction)

`WorkUnit` is the abstract base class for all executable units in the system. It defines a single method:

```typescript
abstract execute(): Promise<any>
```

Both `Task` and `Workflow` extend this base class, allowing them to be composed together.

#### 2. **Task** (Leaf Node)

A `Task` is a concrete work unit that represents a single, atomic AI operation:

- **Contains**: A specific task description (e.g., "Create login form component")
- **Has**: An assigned model (e.g., `'gpt-5'` or `'claude-sonnet-4.5'`)
- **Executes**: By creating an `Agent` and calling `agent.act(task)`
- **Purpose**: Represents one discrete AI operation

```typescript
// Task execution flow:
Task.execute() → Creates Agent → Calls agent.act(task) → Returns AI response
```

#### 3. **Workflow** (Container Node)

A `Workflow` is a composite work unit that orchestrates multiple tasks:

- **Contains**: Multiple `WorkUnit`s (Tasks or nested Workflows)
- **Has**: An execution mode: `'sequential'` or `'parallel'`
- **Orchestrates**: The execution of its child units
- **Supports**: Nested workflows (workflows within workflows)

```typescript
// Workflow structure:
Workflow {
  mode: 'sequential' | 'parallel',
  units: [Task, Task, Workflow, Task, ...]
}
```

### Planning Agent

The `PlanningAgent` is a specialized agent that converts high-level goals into structured, executable workflows.

#### How It Works

1. **Takes a Goal**: You provide a high-level goal like `"Implement login functionality"`

2. **Uses Structured Output**: The planner uses `PlanSchema` to get a structured plan from the LLM

3. **Generates a Plan**: The LLM returns a tree structure that might look like:
   ```typescript
   Plan {
     root: {
       kind: "workflow",
       mode: "sequential",
       units: [
         { kind: "task", task: "Design login form UI", model: "gpt-5" },
         { kind: "task", task: "Implement authentication logic", model: "claude-sonnet-4.5" },
         { 
           kind: "workflow", 
           mode: "parallel",
           units: [
             { kind: "task", task: "Add input validation", model: "gpt-5-mini" },
             { kind: "task", task: "Style the login form", model: "gpt-5-nano" }
           ]
         }
       ]
     }
   }
   ```

4. **Builds Workflow**: Recursively converts the Plan tree into a `Workflow` object with nested `Task` and `Workflow` instances

#### Planning Agent Rules

The planner follows these guidelines (embedded in its prompt):

- Use `'parallel'` for tasks that can be run simultaneously
- Pick models based on task complexity
- Keep prompts actionable
- Don't ask for user input—work with available data

### Execution Strategies

#### Sequential Execution

Tasks run one after another, in order:

```typescript
for (const unit of workflow.units) {
    results.push(await unit.execute()) // Wait for each to complete
}
```

Use this when tasks have dependencies or must run in a specific order.

#### Parallel Execution

Tasks run simultaneously:

```typescript
const promises = workflow.units.map(unit => unit.execute())
const results = await Promise.all(promises) // All execute concurrently
```

Use this when tasks are independent and can be executed concurrently for better performance.

### Autonomy Mechanism

The system provides autonomy through several key mechanisms:

1. **Goal Decomposition**: The planner automatically breaks down high-level goals into actionable tasks
2. **Model Selection**: The planner intelligently assigns models based on task complexity
3. **Autonomous Execution**: Each task runs independently via an `Agent` without requiring user input
4. **Orchestration**: The workflow system handles dependencies and execution order automatically
5. **Nested Workflows**: Complex goals can have multi-level plans with workflows within workflows

### Example: Using Planning Agent

Here's a complete example of using the planning agent to implement a feature autonomously:

```typescript
import { Command, PlanningAgent, Workflow } from "@jigjoy-io/mosaic"
import 'dotenv/config'

// 1. Create a command with your preferred model for planning
const command: Command = {
    model: 'gpt-5'
}

// 2. Initialize the planning agent
const planner = new PlanningAgent(command)

// 3. Generate a workflow from a high-level goal
const workflow: Workflow = await planner.planFromGoal('Implement login functionality')

// 4. Execute the entire workflow autonomously
await workflow.execute()
```

#### What Happens Behind the Scenes

1. **Planning Phase**: The `PlanningAgent` sends your goal to the LLM with structured output constraints
2. **Plan Generation**: The LLM returns a structured plan breaking down the goal into tasks
3. **Workflow Construction**: The plan is converted into a `Workflow` object with nested `Task` and `Workflow` instances
4. **Execution Phase**: The workflow executes all tasks according to their execution mode:
   - Sequential tasks run one after another
   - Parallel tasks run simultaneously
   - Nested workflows execute recursively

#### Example Workflow Structure

For the goal `"Implement login functionality"`, the generated workflow might look like:

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

This structure allows:
- **Complex Goal Decomposition**: Breaking down large goals into manageable tasks
- **Automatic Model Selection**: Choosing the right model for each task's complexity
- **Parallel Execution**: Running independent tasks simultaneously for efficiency
- **Nested Workflows**: Handling complex, multi-level plans
- **Full Autonomy**: No user intervention needed during execution

The planner acts as a meta-agent that creates a team of specialized agents, each handling a specific subtask, all orchestrated by the workflow system.

---

Working examples are available on the [GitHub repo](https://github.com/jigjoy-io/mosaic-examples).

---

## Author & License

Created by [JigJoy](https://jigjoy.io) team  
Licensed under the MIT License.