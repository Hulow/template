export type AgentEvent =
  | {
      type: "message";
      content: string;
    }
  | {
      type: "tool.started";
      tool: string;
    }
  | {
      type: "tool.completed";
      tool: string;
    }
  | {
      type: "completed";
    }
  | {
      type: "failed";
      error: string;
    };