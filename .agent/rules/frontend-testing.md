---
alwaysApply: false
---

---

# Testing Rules

This project follows a layer-based testing strategy aligned with Clean Architecture.

Tests MUST respect architectural boundaries and follow the same dependency rules as production code.

---

# 1. Domain Tests (Highest Priority)

Location:
src/features/**/domain/**/*.test.ts

Rules:
- MUST test business rules and invariants
- MUST NOT use React
- MUST be pure unit tests
- MUST NOT mock React or adapters (not needed)

What to test:
- domain logic (e.g. Counter increment rules)
- domain errors (e.g. CounterError cases)
- invariants and constraints

Example:
- Counter.create(-1) throws CounterError
- increment() returns new correct state

---

# 2. Adapters Tests (Integration Level)

Location:
src/features/**/adapters/**/*.test.ts

Rules:
- MAY use React Testing Library
- MAY render hooks using renderHook
- MAY use context/provider setup
- SHOULD test integration between React state and domain logic
- MUST NOT test UI styling

What to test:
- hooks behavior (useCounter)
- provider state updates
- context integration
- interaction between React and domain layer

---

# 3. UI Tests (Behavior Only)

Location:
src/features/**/ui/**/*.test.ts

Rules:
- MUST test user-visible behavior only
- MUST use React Testing Library
- MUST NOT test domain logic directly
- MUST NOT assert implementation details

What to test:
- user clicks +1 → UI updates
- displayed value changes correctly
- component renders correctly with given state

---

# 4. Testing Philosophy

Tests follow Given / When / Then structure:

Given:
initial state or setup

When:
user action or function call

Then:
expected outcome

---

# 5. Test Boundaries Rule (IMPORTANT)

- Domain tests MUST NOT import React
- UI tests MUST NOT import domain directly
- Adapters tests MAY use both domain + React
- Tests MUST respect production dependency flow

Allowed:
UI → Adapters → Domain (in tests too)

Forbidden:
Domain depending on UI in tests
UI testing internal domain logic
Adapters testing styling or CSS

---

# 6. Error Testing Rule

- Domain errors MUST be tested in domain layer tests
- UI MUST NOT test error classes directly
- UI MAY test user-facing error handling behavior only

Example:
- Domain: CounterError thrown
- UI: shows fallback message or prevents invalid action

---

# Core Principle

Testing mirrors architecture:

Domain = logic correctness  
Adapters = integration correctness  
UI = user behavior correctness