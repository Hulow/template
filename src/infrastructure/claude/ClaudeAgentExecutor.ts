import {
  AgentEventListener,
  AgentExecutor,
  AgentInput,
  AgentOutput,
} from "../../application/ports/AgentExecutor.ts";
import type { AgentSession } from "../../application/ports/AgentSession.ts";
import { Agent } from "../../domain/Agent.ts";

/*
  Responsability: Run a session and handle events.
*/

export class ClaudeAgentExecutor implements AgentExecutor {
  constructor(
    private readonly session: AgentSession,
  ) {}

  async run(
    _agent: Agent,
    input: AgentInput,
    onEvent?: AgentEventListener,
  ): Promise<AgentOutput> {
    const events = this.session.run(input);

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
