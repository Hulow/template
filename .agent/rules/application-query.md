---
alwaysApply: false
---

Defines read-side behavior.

Usually much lighter than command rules.

Query principles
    Queries return optimized read models
    Queries never mutate state

Readers
    Reader interfaces abstract persistence
    Queries may bypass aggregates

Return models
    Return DTO/read models only
    Never return aggregates

Performance orientation
    Favor projection efficiency over domain purity on read side
