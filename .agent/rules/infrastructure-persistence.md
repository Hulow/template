---
alwaysApply: false
---

Defines adapter implementation standards.

This file protects infra from becoming the real application layer.

Repository implementation
    Repositories implement ports only
    Repositories map persistence <-> domain

ORM isolation
    ORM entities never escape infrastructure

Mapping rules
    Use explicit mappers
    Avoid leaking persistence shape into domain

Transactions
    Infrastructure does not own business transactions
    
Forbidden patterns
    Repositories must not:
        - contain business logic
        - expose ORM internals
        - return persistence entities