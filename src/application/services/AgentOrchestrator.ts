import { Agent } from "../../domain/Agent.ts";
import { AgentEventListener, AgentExecutor } from "../ports/AgentExecutor.ts";

/*
  Responsability: execute an agent.
*/

export interface AgentRunOptions {
  onEvent?: AgentEventListener;
  interactive?: boolean;
}

export class AgentOrchestrator {
  constructor(
    private readonly agentExecutor: AgentExecutor,
  ) {}

  async run(
    agent: Agent,
    prompt: string,
    options?: AgentRunOptions,
  ): Promise<string> {
    const result = await this.agentExecutor.run(
      agent,
      {
        prompt,
        interactive: options?.interactive,
      },
      options?.onEvent,
    );

    return result.content;
  }
}