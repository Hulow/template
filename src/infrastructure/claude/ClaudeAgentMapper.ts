import type { Options } from "@anthropic-ai/claude-agent-sdk";

import { Agent } from "../../domain/Agent.ts";

export class ClaudeAgentMapper {
  constructor(
    private readonly cwd: string,
  ) {}

  toOptions(agent: Agent): Options {
    return {
      cwd: this.cwd,
      systemPrompt: this.toSystemPrompt(agent),
    };
  }

  private toSystemPrompt(agent: Agent): string | undefined {
    const sections = [agent.systemPrompt, ...agent.rules].filter(
      (section): section is string => Boolean(section),
    );

    return sections.length > 0
      ? sections.join("\n\n")
      : undefined;
  }
}