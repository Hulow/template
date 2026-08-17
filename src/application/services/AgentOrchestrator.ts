import { Agent } from "../../domain/Agent.ts";
import { AgentEventListener, AgentExecutor } from "../ports/AgentExecutor.ts";

/*
  Responsability: execute an agent.
*/

export class AgentOrchestrator {
  constructor(
    private readonly agentExecutor: AgentExecutor,
  ) {}

  async run(
    agent: Agent,
    prompt: string,
    onEvent?: AgentEventListener,
  ): Promise<string> {
    const result = await this.agentExecutor.run(
      agent,
      {
        prompt,
      },
      onEvent,
    );

    return result.content;
  }
}