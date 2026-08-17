import type { AgentSessionFactory } from "../../application/ports/AgentSessionFactory.ts";
import type { AgentSession } from "../../application/ports/AgentSession.ts";
import type { Environment } from "../../application/ports/Environment.ts";
import type { UserInput } from "../../application/ports/UserInput.ts";
import { Agent } from "../../domain/Agent.ts";

import { ClaudeAgentMapper } from "./ClaudeAgentMapper.ts";
import { ClaudeAgentSession } from "./ClaudeAgentSession.ts";
import { ClaudeMessageMapper } from "./ClaudeMessageMapper.ts";

/*
  Responsability: Build a ClaudeAgentSession scoped to a given agent.
*/

export class ClaudeAgentSessionFactory implements AgentSessionFactory {
  constructor(
    private readonly agentMapper: ClaudeAgentMapper,
    private readonly messageMapper: ClaudeMessageMapper,
    private readonly environment: Environment,
    private readonly userInput: UserInput,
  ) {}

  create(agent: Agent): AgentSession {
    return new ClaudeAgentSession(
      agent,
      this.agentMapper.toOptions(agent),
      this.messageMapper,
      this.environment,
      this.userInput,
    );
  }
}
