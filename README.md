# Mosaic

Mosaic is a TypeScript library for orchestrating AI agents, supporting both manually defined and AI-generated workflows.

---

## 📦 Installation

```bash
yarn add @jigjoy-io/mosaic
```

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


### Structured Output, Vision and Tools

The system supports structured outputs, multimodal input (text and images), custom tool definitions, and long-running multi-turn interactions, making it suitable for complex and interactive workflows.

---

### Parallel Task Execution

This feature allows you to run multiple AI agents in parallel—across different models or providers—to execute the same or different tasks simultaneously and compare or combine their results.

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

## Author & License

Created by [JigJoy](https://jigjoy.io) team  
Licensed under the MIT License.
