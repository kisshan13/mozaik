# Mosaic

**Mosaic** is an **agentic framework built around capabilities instead of monolithic SDKs**. Each capability—text generation, tool use, vision, reasoning, structured output, etc.—is modeled as an independent **OOP interface (port)** with clear contracts. Concrete LLMs (GPT‑5, Gemini, Claude, local models) act as **adapters**, implementing these ports through a unified type system.

Unlike traditional, function‑based SDKs, Mosaic uses a Builder Pattern that composes multiple capabilities into a single, strongly‑typed handle. This allows a single agent to combine multiple models—for example, using a small, cheap text model for planning and a large model for tool execution—without the user worrying about provider differences.

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

### Setup

```typescript
import { Mosaic, OpenAIModel, OpenAIText, OpenAITools } from "@jigjoy-io/mosaic"

const mosaic = new Mosaic()
  .withText(new OpenAIText(OpenAIModel.GPT_5_MINI))
  .withTools(new OpenAITools(OpenAIModel.GPT_5))
  .build()
```

### Simple Agent

```typescript
import { TextGen } from "@jigjoy-io/mosaic"

export class Meteorologist {
    constructor(private llm: TextGen) {}

    async response(userMsg: string) {
        return this.llm.text([{ role: "user", content: userMsg }])
    }
}

const agent = new Meteorologist(mosaic)
const output = await agent.response("What's the weather like?")
console.log(output.text)
```

### Agent with Tools

```typescript
import { ToolSpec, ToolUse } from "@jigjoy-io/mosaic"

class WeatherDB {
    async run({ city }: { city: string }) {
        const db: Record<string, { tempC: number; condition: string }> = {
            "Belgrade": { tempC: 23, condition: "Partly Cloudy" },
            "Novi Sad": { tempC: 24, condition: "Sunny" }
        }
        return db[city] || { tempC: 22, condition: "Clear" }
    }
}

class WeatherTool implements ToolSpec {
    constructor(private db: WeatherDB) {}
    
    name = 'getWeather'
    schema = { 
        type: "object", 
        properties: { city: { type: "string" } }, 
        required: ["city"] 
    }
    
    async invoke(args: any) {
        return this.db.run(args)
    }
}

export class MeteorologistWithTool {
    constructor(private llm: ToolUse, private tools: ToolSpec[]) {}

    async response(userMsg: string) {
        return this.llm.withTools(
            [{ role: "user", content: userMsg }], 
            this.tools
        )
    }
}

const weatherTool = new WeatherTool(new WeatherDB())
const agent = new MeteorologistWithTool(mosaic, [weatherTool])
const exec = await agent.response("What's the weather in Belgrade?")
console.log("ToolCalls →", exec.toolCalls)
console.log("Answer →", exec.text)
```

---

See [mosaic-examples](https://github.com/Mijura/mosaic-examples) for working demos.

---

## Philosophy

- **Object-oriented**: JBy structuring Mosaic as a network of objects instead of a chain of functions, developers can debug, trace, and reason about agents with the same clarity as any production system.
- **Composition over Abstraction**: Agents are built by wiring capabilities, not by wrapping them. Each capability is explicit and composable, making behavior observable and predictable.
- **Pragmatic Polyglotism**: Different models serve different purposes; Mosaic coordinates them instead of forcing one dominant design.

---

## Author & License

Created by [JigJoy](https://jigjoy.io) team\
Licensed under the MIT License.
