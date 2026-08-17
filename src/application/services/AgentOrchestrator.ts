import { AgentRef } from "../../domain/agent/AgentRef.ts";
import { AgentExecutor } from "../ports/AgentExecutor.ts";

export class AgentOrchestrator {
  constructor(
    private readonly agentExecutor: AgentExecutor,
  ) {}

  async run(
    agent: AgentRef,
    prompt: string,
  ): Promise<string> {
    const result = await this.agentExecutor.run(
      agent,
      {
        prompt,
      },
    );

    return result.content;
  }
}