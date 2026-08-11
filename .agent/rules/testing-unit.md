---
alwaysApply: false
---

Defines fast feedback strategy.

Unit philosophy
    Prioritize handler unit tests
    Mock infrastructure
    Test business paths and edge cases

Scope
    Unit tests should not:
        - hit DB
        - hit HTTP
        - use real infrastructure

Naming
    should_<expected>_when_<condition>