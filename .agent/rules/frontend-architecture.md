---
description: Frontend Architecture Rules (Feature-Based Clean Architecture for React + TypeScript)
globs: ["src/**/*"]
---

# Frontend Architecture Rules

This project follows a feature-based Clean Architecture adapted for React + TypeScript.

It enforces strict separation between:
- Domain (business logic)
- Adapters (React integration layer)
- UI (presentation layer)
- App (composition root)

React is NOT the architecture. It is only an adapter over a domain model.

---

# Domain Layer

Location:
src/features/**/domain/

Rules:
- MUST NOT use React or UI libraries
- MUST contain business rules and invariants
- MUST be framework-agnostic
- SHOULD be immutable
- MUST be fully testable without React
- MUST NOT depend on adapters, UI, or app layer

Examples:
Counter.ts, CounterError.ts

---

# Adapters Layer (React Integration)

Location:
src/features/**/adapters/

Includes:
- hooks
- context
- providers

Rules:
- MAY use React APIs (useState, useContext, etc.)
- MAY depend on domain layer
- MUST NOT contain UI rendering logic
- MUST NOT contain styling or presentation concerns
- MUST NOT import UI components
- Acts as a bridge between UI and domain

Dependency flow:
UI → Adapters → Domain

Examples:
useCounter.ts, counter.context.ts, counter.provider.ts

---

# UI Layer (Presentation)

Location:
src/features/**/ui/

Rules:
- MUST NOT contain business logic
- MUST NOT implement state management
- MUST ONLY consume adapters (hooks)
- MAY contain styling (Chakra UI, CSS)
- MUST remain as presentational as possible

Examples:
Counter.tsx

---

# APP LAYER (Composition Root)

Location:
src/app/

This layer is the application bootstrap and dependency wiring layer.

Rules:
- MUST NOT contain business logic
- MUST NOT implement feature logic
- MUST NOT contain reusable domain concepts
- MUST ONLY wire providers, global configuration, and app initialization
- Acts as composition root of the application

Responsibilities:
- Initialize React application
- Wrap global providers (Chakra, Context providers, etc.)
- Define application-wide layout (App.tsx)
- Import global styles (if needed)

Must NOT:
- implement feature logic
- define domain rules
- define reusable hooks for features
- contain UI components that belong to features

Examples:
App.tsx, providers/AppProvider.tsx, providers/ChakraProvider.tsx

---

# Feature Structure

Each feature MUST be self-contained:

src/features/<feature>/
  domain/
  adapters/
  ui/

Example:

counter/
  domain/
    Counter.ts
    CounterError.ts

  adapters/
    useCounter.ts
    counter.context.ts
    counter.provider.ts

  ui/
    Counter.tsx

---

# Dependency Rules

Allowed flow:
UI → Adapters → Domain
App → Adapters + UI

Forbidden:
- Domain importing React
- Domain importing UI
- Domain importing app layer
- Adapters importing UI components
- UI implementing business logic
- App implementing feature logic

---

# Error Handling

Business errors MUST live in the domain layer.

Rules:
- MUST extend Error
- MUST represent domain concepts (not generic runtime errors)
- MUST NOT be handled in UI except for presentation

Example:

export class CounterError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CounterError"
  }
}

---

# Styling Rules

- Styling belongs ONLY to UI layer
- MUST NOT exist in domain or adapters
- MAY use Chakra UI or CSS
- MUST NOT influence business logic

Global styles:
src/index.css

Component styles:
Inside UI components only

---

# Core Principle

React is NOT the architecture.

React is a UI rendering system sitting on top of a domain model.

The domain layer defines truth.
Adapters connect React to domain.
UI renders state.
App wires everything together.