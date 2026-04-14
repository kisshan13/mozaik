# Mozaik

Mozaik is a TypeScript library for orchestrating AI agents.

![mozaik](https://github.com/user-attachments/assets/0fdc15a8-3778-4d0e-bd13-143d04090b9e)

---

## 📦 Installation

```bash
yarn add @mozaik-ai/core
```

## API Key Configuration

Make sure to set your API keys in a `.env` file at the root of your project:

```env
# For OpenAI
OPENAI_API_KEY=your-openai-key-here
```

## Context Engine (Overview)

The **Context Engine** models the core behavior of a language model:

> Given a structured **context**, produce a **response**.

It abstracts away vendor-specific APIs (e.g. OpenAI) and provides a domain-centric interface for working with LLMs.

---

## Compatibility

This domain model is fully compatible with the **Open Responses** specification for multi-provider LLM interfaces ([openresponses.org](https://www.openresponses.org/)).

## Core Concepts

### Context

Represents everything the model needs to generate a response.

A context is composed of ordered **context items**.

---

### ContextItem

A single unit of context.

Examples:

- Client-specific
    - User message
    - Developer message (System instruction)
    - Function call output (added after a model function call and fed back so the model can continue reasoning or finish the job)
- Model-specific
    - Function call
    - Model message
    - Reasoning

---

## Author & License

Created by [JigJoy](https://jigjoy.io) team
Licensed under the MIT License.
