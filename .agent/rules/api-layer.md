---
alwaysApply: false
---

Defines HTTP boundary behavior.

This file protects your application core from transport concerns.

Controller rules
    One controller per operation
    Controllers stay thin
    Controllers orchestrate only

DTO rules
    DTOs colocated with controllers
    DTOs represent transport contracts only
    Never expose domain entities directly

Validation
    Validation belongs at API boundary
    Use decorators/pipes
    Do not duplicate validation in handlers unless business invariant

Forbidden patterns
    Controllers must not:
    - access repositories
    - use ORM
    - contain business logic
    - perform transactions