# Contributing to Mozaik

Thanks for your interest in contributing to Mozaik.

Mozaik is still in an early phase, so we want to keep the contribution process simple. The most important thing is alignment: before spending time on a larger change, please talk to us first.

## Start with a discussion

Before working on a new feature, architectural change, or large refactor, please open a GitHub issue first.

This helps us:

- understand the problem you want to solve
- discuss whether the change fits Mozaik's direction
- agree on the right design before code is written
- avoid duplicated or wasted work

Small bug fixes can go directly to a pull request, especially when the issue is clear and the fix is focused.

## Before contributing

Mozaik is built on top of the [OpenResponses specification](https://www.openresponses.org). This is an important foundation of the project.

Before contributing changes related to model context, streaming, tools, function calls, provider adapters, or response items, please make sure you understand the OpenResponses model and keep your implementation aligned with it.

Avoid introducing concepts that conflict with OpenResponses unless the change has been discussed first.

## Code quality comes first

Code quality is more important than speed.

We would rather merge a smaller, well-designed change than a large change that is difficult to understand, test, or maintain.

Good contributions should be:

- clear
- focused
- easy to review
- easy to test
- consistent with the existing architecture
- simple unless complexity is truly needed

Please avoid overengineering. Add abstractions only when they solve a real problem in the current codebase.

## Architecture guidelines

Mozaik follows Domain-Driven Design with a layered architecture.

The main layers are:

- `domain`
- `application`
- `infrastructure`

Each layer has a different responsibility.

### Domain layer

The `domain` layer contains pure domain logic.

This layer should describe the core concepts, rules, and behavior of Mozaik without depending on external systems.

The domain layer must not contain:

- file system access
- network calls
- database access
- LLM provider integrations
- timers or blocking operations
- framework-specific runtime code
- direct coupling to infrastructure services

Domain code should be easy to test without mocks for external systems. If a test needs a real file, database, HTTP request, or LLM provider, the logic probably does not belong in the domain layer.

The domain layer should focus on business rules and core model behavior.

### Application layer

The `application` layer coordinates use cases.

It can connect domain objects together and define workflows, but it should still avoid knowing unnecessary infrastructure details.

Use this layer for orchestration that belongs to Mozaik itself, not for low-level integrations.

### Infrastructure layer

The `infrastructure` layer contains integrations with the outside world.

Put implementation details here, such as:

- file system persistence
- provider adapters
- LLM integrations
- API clients
- storage backends
- runtime-specific implementations
- logging, telemetry, or external services

Infrastructure code may depend on the domain and application layers, but the domain layer should not depend on infrastructure.

## Pull requests

When opening a pull request, please keep it focused.

A good PR should:

- solve one clear problem
- include tests when behavior changes
- update documentation when needed
- explain what changed and why
- avoid unrelated formatting or refactoring

Large changes are much easier to review when they are discussed first and split into smaller PRs.

## What may be rejected

A PR may be rejected or delayed if it:

- was not discussed first and changes the public API or architecture
- mixes unrelated changes together
- adds unnecessary complexity
- breaks the layered architecture
- couples domain logic to infrastructure
- conflicts with OpenResponses concepts
- lacks tests for important behavior
- makes the code harder to understand or maintain

This does not mean the contribution is not appreciated. It usually means we need to align on the design first.

## Thank you

Mozaik is young, and thoughtful contributions matter a lot.

If you care about clean architecture, reactive agents, OpenResponses compatibility, and high-quality TypeScript, we would love your help.
