# Context Engine

## Overview

The **Context Engine** models the core behavior of a language model:

> Given a structured **context**, produce a **response**.

It abstracts away vendor-specific APIs (e.g. OpenAI) and provides a domain-centric interface for working with LLMs.

---

## Compatibility

This domain model is fully compatible with the **Open Responses** specification for multi-provider LLM interfaces (`https://www.openresponses.org/`).

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
