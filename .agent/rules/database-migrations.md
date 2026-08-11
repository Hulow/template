---
alwaysApply: false
---

Defines schema evolution discipline.

Very important in serious systems.

Migration safety
    Prefer additive migrations
    Avoid destructive schema changes

Rollback strategy
    Migrations should be reversible when possible

Naming conventions
    Consistent naming:
        - snake_case
        - fk_<table>
        - idx_<table>

Data consistency
    Do not couple migrations with business logic