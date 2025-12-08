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

## Features 

### Work Across Models
- Use different models for different tasks
- Combine multiple providers in one system
- Switch models without rewriting workflows

### Build AI Agents
- Compose AI agents from simple tasks
- Define agents using explicit workflows
- Reuse and combine agent behavior
- Build agents incrementally

### Work with Structure
- Enforce structured outputs
- Validate agent responses
- Maintain predictable agent behavior

### Control Autonomy
- Manually define agent behavior
- Generate agent workflows from high-level goals
- Combine manual and AI-generated workflows
- Tune the level of autonomy per agent

### Handle Real Inputs
- Work with text and images
- Support long, multi-turn interactions

---

Working examples are available on the [GitHub repo](https://github.com/jigjoy-io/mosaic-examples).

---

## Author & License

Created by [JigJoy](https://jigjoy.io) team  
Licensed under the MIT License.
