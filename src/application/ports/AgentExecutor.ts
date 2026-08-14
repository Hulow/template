export interface AgentExecutor {
  run(agent: AgentRef, input: AgentInput): Promise<AgentOutput>;
}

export interface AgentRef {
  id: string;
}

export interface AgentInput {
  prompt: string;
}

export interface AgentOutput {
  content: string;
}
