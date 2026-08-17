import { Agent } from "../../domain/agent/Agent.ts";
import { AgentExecutor } from "../ports/AgentExecutor.ts";

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
  ): Promise<string> {
    const result = await this.agentExecutor.run(
      agent,
      {
        prompt,
      },
    );

    console.log(result)

    return result.content;
  }
}