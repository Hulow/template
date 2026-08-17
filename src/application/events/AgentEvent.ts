export type TokenUsage = {
  inputTokens: number;
  outputTokens: number;
};

export type AgentEvent =
  | {
      type: "message";
      agentName: string;
      content: string;
      usage: TokenUsage;
    }
  | {
      type: "tool.started";
      agentName: string;
      tool: string;
    }
  | {
      type: "tool.completed";
      agentName: string;
      tool: string;
    }
  | {
      type: "completed";
      agentName: string;
    }
  | {
      type: "failed";
      agentName: string;
      error: string;
    };