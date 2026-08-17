import {
  AgentEventListener,
  AgentExecutor,
  AgentInput,
  AgentOutput,
} from "../../application/ports/AgentExecutor.ts";
import type { AgentSessionFactory } from "../../application/ports/AgentSessionFactory.ts";
import { Agent } from "../../domain/Agent.ts";

/*
  Responsability: Run a session and handle events.
*/

export class ClaudeAgentExecutor implements AgentExecutor {
  constructor(
    private readonly sessionFactory: AgentSessionFactory,
  ) {}

  async run(
    agent: Agent,
    input: AgentInput,
    onEvent?: AgentEventListener,
  ): Promise<AgentOutput> {
    const session = this.sessionFactory.create(agent);
    const events = session.run(input);

    let content = "";

    for await (const event of events) {
      onEvent?.(event);

      if (event.type === "message") {
        content += event.content;
      }

      if (event.type === "failed") {
        throw new Error(event.error);
      }
    }

    return { content };
  }
}
