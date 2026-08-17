export type AgentStatus =
  | "idle"
  | "running"
  | "completed"
  | "failed";

export class Agent {
  private status: AgentStatus = "idle";
  private sessionId?: string;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly skills: readonly string[] = [],
    readonly rules: readonly string[] = [],
    readonly systemPrompt?: string,
  ) {}

  start(sessionId: string): void {
    this.status = "running";
    this.sessionId = sessionId;
  }

  complete(): void {
    this.status = "completed";
  }

  fail(): void {
    this.status = "failed";
  }

  getStatus(): AgentStatus {
    return this.status;
  }

  getSessionId(): string | undefined {
    return this.sessionId;
  }
}