import {
  AgentExecutor,
  AgentInput,
  AgentOutput,
} from "../../application/ports/AgentExecutor.ts";
import type { AgentSession } from "../../application/ports/AgentSession.ts";

import { AgentRef } from "../../domain/agent/AgentRef.ts";

export class ClaudeAgentExecutor implements AgentExecutor {
  constructor(
    private readonly session: AgentSession,
  ) {}

  async run(
    _agent: AgentRef,
    input: AgentInput,
  ): Promise<AgentOutput> {
    const events = this.session.run(input);

    let content = "";

    for await (const event of events) {
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
