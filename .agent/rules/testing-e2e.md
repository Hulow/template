---
alwaysApply: false
---

Defines contract-level confidence.

E2E philosophy
    E2E validates integration contracts
    Not every branch requires E2E

Coverage goals
    Focus on:
        - routing
        - auth
        - serialization
        - HTTP status
        - wiring

Avoid
    Do not duplicate unit test coverage in E2E