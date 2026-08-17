import { AgentRef } from "../../domain/agent/AgentRef.ts";


export interface AgentInput {
  prompt: string;
}

export interface AgentOutput {
  content: string;
}

export interface AgentExecutor {
  run(
    agent: AgentRef,
    input: AgentInput,
  ): Promise<AgentOutput>;
}