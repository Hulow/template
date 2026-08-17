export type AgentStatus =
  | "idle"
  | "running"
  | "completed"
  | "failed";

export class AgentState {
  constructor(
    readonly status: AgentStatus = "idle",
    readonly sessionId?: string,
  ) {}

  start(sessionId: string): AgentState {
    return new AgentState("running", sessionId);
  }

  complete(): AgentState {
    return new AgentState("completed", this.sessionId);
  }

  fail(): AgentState {
    return new AgentState("failed", this.sessionId);
  }
}