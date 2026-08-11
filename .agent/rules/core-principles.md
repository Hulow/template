---
alwaysApply: false
---

# Core Principles

This file defines the global architectural principles of the backend.

All layers and modules MUST respect these rules.

---

# Architectural Style

The backend follows:

- Domain-Driven Design (DDD)
- CQRS
- Hexagonal Architecture
- Modular feature slices

Dependencies MUST point inward.

---

# Dependency Direction

Allowed dependency flow:

API -> Application -> Domain

Infrastructure implements ports defined by Domain/Application.

Domain MUST NEVER import:
- infrastructure
- ORM
- framework code
- HTTP concerns

---

# DDD Principles

## Domain Ownership

Domain layer owns:
- business invariants
- business behaviors
- aggregate consistency
- value object rules

Rich domain models are preferred over transaction scripts.

---

## Aggregates

Aggregates enforce consistency boundaries.

State mutations MUST happen through explicit domain behaviors.

❌ FORBIDDEN:

- public mutable state
- bypassing aggregate methods
- anemic domain models

---

## Ubiquitous Language

Business terminology MUST remain consistent across:
- domain
- application
- API contracts

Technical naming leakage should be avoided.

---

# CQRS Principles

## Commands

Commands mutate state.

Command handlers:
- orchestrate use cases
- coordinate aggregates
- manage transactional workflows

---

## Queries

Queries NEVER mutate state.

Queries may bypass aggregates for optimized read models.

Read models are NOT domain entities.

---

# Hexagonal Architecture

Infrastructure depends on abstractions only.

Ports are defined in Domain/Application layers.

Adapters implement ports in Infrastructure.

---

# Architectural Constraints

❌ FORBIDDEN:

- fat controllers
- direct ORM access from handlers
- business logic in DTOs
- framework code inside domain
- persistence logic inside domain behaviors
- infrastructure leaking into application/domain
- application services bypassing aggregate invariants

---

# Layer Responsibilities

- API exposes the system
- Application orchestrates use cases
- Domain defines business behavior
- Infrastructure supports technical concerns

See layer-specific rule files for detailed constraints.