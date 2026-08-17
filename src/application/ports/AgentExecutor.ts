import { Agent } from "../../domain/Agent.ts";
import type { AgentEvent } from "../events/AgentEvent.ts";

export interface AgentInput {
  prompt: string;
  interactive?: boolean;
}

export interface AgentOutput {
  content: string;
}

export type AgentEventListener = (event: AgentEvent) => void;

export interface AgentExecutor {
  run(
    agent: Agent,
    input: AgentInput,
    onEvent?: AgentEventListener,
  ): Promise<AgentOutput>;
}