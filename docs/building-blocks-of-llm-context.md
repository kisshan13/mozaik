# Building Blocks of LLM Context (and Why It’s Not the End of Programming)

If you’ve spent time with large language models recently, you’ve probably felt the temptation to think: **this might be the end of programming as we know it**.

That suspicion isn’t irrational. It’s the same scientific reflex that moves society forward: **doubt the status quo, then go look for evidence**.

But this mindset can (and should) be questioned.

What’s the evidence that makes people suspicious in the first place?

- **Agentic AI frameworks feel “cloudy.”** They work, but they rarely feel like they _explain_ anything.
- **Domain knowledge is missing.** Many libraries expose a ubiquitous language that avoids the core concepts we actually need to reason about: context, context items, inference steps, tool calls, tool outputs, persistence, replay, undo/redo.

When a library’s language is missing core domain concepts, developers compensate by inventing ad‑hoc conventions in application code. That’s when “context engineering” starts sounding like magic, and the mainstream opinion emerges:

- “Only the LLM providers really understand this stuff.”

My take is the opposite:

> If we want breakthroughs, we should aim to **express the domain** in our libraries—not only ship something that “works.”

As the vocabulary becomes explicit and accumulates, systems become easier to evolve, debug, and extend. That’s how breakthroughs compound: not by mystique, but by **clear concepts**.

## A helpful lens: OpenResponses (Jan 2026)

In January 2026, OpenAI together with OpenRouter and Vercel introduced the **OpenResponses** specification. The big idea is simple:

- **Normalize** how we represent LLM requests and responses across providers.
- Enable the open-source community to build tooling once, then reuse it everywhere.

More importantly for engineers: a specification is a _map_. It makes the system legible.

Once you look at OpenResponses-style payloads, a key fact becomes obvious:

> Regardless of provider, the “context” you send into an LLM is composed from the same kinds of building blocks.

In this article I’ll call those building blocks **context items**.

## Context is made of context items

There are two broad families of context items:

- **Client-authored context items**: created and managed by your system.
- **Model-authored context items**: produced by the model during inference, then fed back into the context to continue the conversation (or agent loop).

This split is extremely practical: it tells you _which parts you own_ and which parts you merely _observe and incorporate_.

## Client-authored context items

These are the blocks your application is responsible for creating, validating, and persisting.

### User message

The user message represents the human’s intent and constraints, in natural language. It’s the anchor for value: without it, you’re building a self-contained system with no external goal.

In `mozaik`, this is a `ContextItem`:

```ts
import { UserMessage } from "src/domain/context-runtime/input/user-message"

const message = UserMessage.create("Tell me a joke about birds")
```

### Developer message

The developer message is where you set _system behavior_ and _policy_ for a given run: tone, guardrails, role, task framing. It’s a durable way to encode “how the assistant should behave” without scattering implicit rules throughout your codebase.

```ts
import { DeveloperMessage } from "src/domain/context-runtime/input/developer-message"

const developerMessage = DeveloperMessage.create(
	"You are a joke teller. You will be given a joke and you will need to tell it to the user.",
)
```

### Function call output

When a model asks to call a function (a tool), your system executes it and appends the result back into the context as a **function call output** item. This is the bridge from “words” to “actions.”

In `mozaik`, that item is `FunctionCallOutput`:

```ts
import { FunctionCallOutput } from "src/domain/context-runtime/input/function-call-output"
import { InputText } from "src/domain/context-runtime/content/input-text"

const output = FunctionCallOutput.create("call_123", [InputText.create("Search results: ...")])
```

## Model-authored context items

These are emitted by the model when you run inference. Your job is to:

- Extract them from the response
- Append them to your context
- Persist them (if you want replay / auditing / undo / scheduling)

### Model output (assistant message)

This is the “final” text the model produces for the user—often represented as an assistant message.

In `mozaik`, this is `ModelMessage`:

```ts
import { ModelMessage } from "src/domain/context-runtime/output/model-message"
```

### Function call (tool request)

A function call is the model’s structured suggestion to execute a function with arguments. In an agent loop, this often becomes the control point:

- Model emits `FunctionCall`
- Your system executes the tool
- You append `FunctionCallOutput`
- You call inference again with the enriched context

In `mozaik`, this is `FunctionCall`:

```ts
import { FunctionCall } from "src/domain/context-runtime/output/function-call"
```

### Reasoning

Some APIs can emit a reasoning item (or a structured trace/summary). You may not always want to store raw reasoning, but **a summary** can be extremely useful for debugging and auditing.

In `mozaik`, this is `Reasoning`:

```ts
import { Reasoning } from "src/domain/context-runtime/output/reasoning"
```

## Streaming context items ⇒ semantic events

Modern LLM APIs can stream their outputs. But streaming is not just “printing tokens.”

If you treat the response as a sequence of partial context item fragments, you get something more powerful:

- **semantic events**: chunks that already have meaning (partial message, partial tool call, partial reasoning summary)

This is a different mental model:

- Instead of “token stream,” think “**context-item stream**.”
- Instead of “render text,” think “**apply events to build the next context item**.”

Once you see streaming as semantic events, a lot of design becomes clearer:

- You can persist partially-built items.
- You can resume a run.
- You can replay an inference step deterministically (when the provider supports it) or at least reproducibly.

## Turning the spec into an object model: `mozaik`

I built `mozaik` as a small, explicit object model around these building blocks:

- `Context` is the container.
- `ContextItem` is the unit.
- A `GenerativeModel` maps `Context` → provider request and provider response → `ContextItem[]`.
- A `ContextRepository` persists and restores contexts (for replay, debugging, scheduling, undo/redo).

### Assemble a context from context items

This example is directly based on `src/example/context-example.ts`.

```ts
import { Context } from "src/domain/context-runtime/context"
import { UserMessage } from "src/domain/context-runtime/input/user-message"
import { DeveloperMessage } from "src/domain/context-runtime/input/developer-message"

const projectId = `pr-${crypto.randomUUID()}`

const context = Context.create(projectId)
	.addItem(DeveloperMessage.create("You are a joke teller..."))
	.addItem(UserMessage.create("Tell me a joke about birds"))
```

### Persist context (so you can restore, replay, and “time travel”)

`mozaik` keeps persistence separate from the context itself. For examples, an in-memory repository is enough:

```ts
import { InMemoryContextRepository } from "src/example/in-memory-context-repository"

const repo = new InMemoryContextRepository()
await repo.save(context)
```

Because contexts are stored per `projectId`, you can fetch the whole history for a project:

```ts
const restoredContexts = await repo.getByProjectId(projectId)
console.log(restoredContexts)
```

This one feature unlocks a lot:

- **Audit trails**: “what did the model see when it said that?”
- **Replays**: re-run inference later with the exact same context items.
- **Branching**: fork context at time \(t\) and try a different prompt/tool choice.
- **Undo/redo**: treat each inference step as a version in a timeline.
- **Schedulers**: persist the run state and continue later (cron, queue, manual approval).

### Call the model and persist the new items

In `mozaik`, a `GenerativeModel` exposes a single operation:

- `call(context) -> Promise<ContextItem[]>`

Your job is to append the returned items and save the new version.

```ts
const newItems = await model.call(context)
context.addItems(newItems)
await repo.save(context)
```

## Why this matters: domain concepts beat “cloudy frameworks”

When we model the domain explicitly, “context engineering” stops being magic. It becomes:

- choosing the right **context items**
- persisting them as first-class entities
- understanding the **loop**: model → items → tools → items → model

Frameworks that hide these concepts behind generic “messages arrays” and “agent runners” force you to learn by folklore.

Libraries that _name the things_ let you learn by reading code.

## Closing thought: programming isn’t ending—it’s becoming more explicit

LLMs change how we write software, but they don’t delete the need for programming.

If anything, they increase the value of:

- **clear abstractions**
- **domain vocabulary**
- **reproducible state**
- **systems you can replay, debug, and evolve**

The path forward isn’t mystical prompt alchemy.

It’s the same thing that has always moved engineering forward:

> Make the important concepts explicit, compose them, persist them, and iterate.
