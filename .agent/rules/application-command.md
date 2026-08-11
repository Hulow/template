---
alwaysApply: false
---

Defines write-side behavior.

This is often the most important file in CQRS systems.

Command structure
    One command = one business intention
    Commands are immutable

Handler responsibilities
    Handlers orchestrate use cases
    Handlers coordinate aggregates and repositories
    Handlers do not contain core business rules

Transaction boundaries
    Transaction starts/ends at handler level

Domain interaction
    Business invariants enforced by aggregates
    Handlers call expressive aggregate methods

Example:
    GOOD:
        perk.activate()
    BAD:
        perk.status = 'ACTIVE'

Forbidden patterns
    Handlers must not:
    - manipulate ORM entities directly
    - contain SQL
    - bypass aggregate methods