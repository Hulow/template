import type { Options } from "@anthropic-ai/claude-agent-sdk";

import { AgentRef } from "../../domain/agent/AgentRef.ts";

export class ClaudeAgentMapper {
  constructor(
    private readonly cwd: string,
  ) {}

  toOptions(_agent: AgentRef): Options {
    return {
      cwd: this.cwd,
    };
  }
}