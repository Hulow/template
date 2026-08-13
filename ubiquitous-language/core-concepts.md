# Core Concepts

Vocabulary of the agent core domain (`src/application/core`), as it exists in the code today. Each term maps to a real type in the codebase — keep this file in sync when those types change.


## Agent
`src/application/core/Agent.ts`

The actor that carries out a user's request. An Agent has a `name`, a single `Goal`, a list of `Capability`, and a list of `Tool`. Today `RunAgentUseCase` constructs one fresh, disposable Agent per invocation, with no capabilities and no tools attached.

## Goal
`src/application/core/Goal.ts`

The Agent's objective, expressed as a free-text `description`. An Agent has exactly one Goal, set at construction and never revised during execution.

## Capability
`src/application/core/Capability.ts`

A named, described competency an Agent is said to have (`name`, `description`). Distinct from a `Tool`: a Capability is a claim about what the Agent can do; a `Tool` is the concrete mechanism for doing it. Currently unused — `RunAgentUseCase` always constructs an Agent with an empty capability list.

## Action
`src/application/core/Action.ts`

A single invocation attempt: a `name` paired with an `input`. Represents "the Agent tried to do X with these arguments." Not currently produced or consumed anywhere in the execution path — no code constructs an `Action` today.

## Tool
`src/application/core/Tool.ts`

A named operation the Agent could invoke, built only via `Tool.create(name)`, which validates `name` against `ToolNames` and hydrates `description`/`inputSchema` from `ToolSchemas`. Tools are declarative definitions, not executors — there is no code path that runs a Tool's effect (e.g. `write_file` never touches the filesystem).

## ToolName / ToolNames
`src/application/core/ToolNames.ts`

The closed catalog of valid tool identifiers (`read_file`, `write_file`, `delete_file`, `list_files`, `move_file`, `copy_file`, `search_files`, `run_command`, `run_tests`, `install_dependency`, `build_project`, `git_status`, `git_diff`, `git_commit`, `git_log`, `create_branch`, `search_web`, `fetch_url`, `search_code`, `find_symbol`, `analyze_code`, `format_code`). `ToolName` is the union type of these string values; `Tool.create` rejects anything outside this set.

## ToolSchemas
`src/application/core/ToolSchemas.ts`

The lookup table from `ToolName` to its `ToolDefinition` (name, description, JSON-schema `inputSchema`). This is what `Tool.create` reads from — it is the source of truth for what arguments each Tool expects.

## ToolDescriptions
`src/application/core/ToolDescriptions.ts`

The lookup table from `ToolName` to a one-line human-readable description. Feeds into `ToolSchemas`; not consumed directly elsewhere.

## Rule
`src/application/core/Rule.ts`

A named instruction (`name`, `instruction`) loaded from the filesystem and folded into the LLM system prompt. Rules are how project conventions (DDD layering, testing strategy, etc.) reach the model — they configure the Agent's behavior rather than extend its capabilities.

## RuleProvider
`src/application/ports/RuleProvider.ts`

The port for loading `Rule[]`. `FileSystemRuleProvider` (`src/infrastructure/FileSystemRuleProvider.ts`) is the only implementation: it reads every `.md` file in a directory (currently `.agent/rules`), turning each filename into a Rule `name` and its file contents into the `instruction`.

## Llm
`src/application/ports/llm.ts`

The port for generating a response: takes an `LlmRequest` (`system`, `prompt`, `tools`) and returns an `LlmResponse` (`content`). `AnthropicClient` (`src/infrastructure/AnthropicClient.ts`) is the only implementation, backed by the Anthropic SDK. Note: it currently ignores `request.tools` when calling the API and only extracts text blocks from the reply — tool-calling is defined in the type but not wired through.

## RunAgentUseCase
`src/application/useCases/RunAgentUseCase.ts`

The orchestration entry point for a single agent turn: builds a disposable `Agent`, loads `Rule[]` via `RuleProvider`, concatenates them into a system prompt, and calls `Llm.generate` once. Stateless across invocations — nothing here persists conversation history.

## TestLlmUseCase
`src/application/useCases/TestLlmUseCase.ts`

A minimal use case that sends a raw prompt straight to `Llm.generate` with no system prompt and no tools. Used to smoke-test the LLM port/adapter in isolation, not part of the agent flow.

# Known Gaps (as of this writing)

These are gaps between the vocabulary above and actual runtime behavior — worth tracking here since they shape what "Tool", "Capability", and "Action" *mean* in this codebase right now:

- **No tool execution loop.** `Tool` definitions exist, but nothing calls the Anthropic API with `tools` attached, and nothing interprets a `tool_use` response block to actually run a tool and feed the result back.
- **No conversation persistence.** Each CLI invocation (`npm run agent "..."`) starts a brand-new `Agent` and a single-turn prompt; no history is stored or replayed between runs.
- **`Capability` and `Action` are unused.** Defined as types, never constructed or read by any use case today.
