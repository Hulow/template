---
alwaysApply: false
---

This is the heart of the system.

The file exists to protect domain purity.

Aggregate rules
    Aggregates enforce invariants
    State mutation only through methods

Entity/value object rules
    Value objects immutable
    Equality by value
    Entities identified by identity
Domain events
    Possibly:
        Aggregates emit domain events
        No infrastructure concerns in events

Purity
    Domain layer must not import:
        - ORM
        - framework
        - HTTP
        - persistence adapters

Ubiquitous language
    Use business terminology consistently
    Avoid technical naming leakage