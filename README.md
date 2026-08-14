# template

You can define exactly:

how agents communicate
which agents are allowed to call which tools
how tasks are delegated
when agents run sequentially vs parallel
how results are validated
how retries work
how state is persisted
how agents are selected
how much context each agent receives
how much an agent is allowed to spend
which LLM provider to use

Agent
  = autonomous worker with a role/capabilities

Orchestrator
  = coordinates agents

Tool
  = external capability an agent can invoke

Action
  = something an agent decides to do

Goal
  = desired outcome


1) define orchestration model:
Sequential -> Simple workflow
DAG -> Parallelizable work
Supervisor -> Dynamic delegation
Hierarchical -> Large complex tasks