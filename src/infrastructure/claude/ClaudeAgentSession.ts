import {
  query,
  type Options,
} from "@anthropic-ai/claude-agent-sdk";

import type { AgentInput } from "../../application/ports/AgentExecutor.ts";
import type { AgentSession } from "../../application/ports/AgentSession.ts";
import type { AgentEvent } from "../../application/events/AgentEvent.ts";
import type { Environment } from "../../application/ports/Environment.ts";

import { ClaudeMessageMapper } from "./ClaudeMessageMapper.ts";
import type { ClaudeSDKMessage } from "./ClaudeSDKMessage.ts";

/* 
  Responsability: Query anthropic api and handle each event
*/

export class ClaudeAgentSession implements AgentSession {
  constructor(
    private readonly options: Options,
    private readonly messageMapper: ClaudeMessageMapper,
    private readonly environment: Environment,
  ) {}

  run(
    input: AgentInput,
  ): AsyncIterable<AgentEvent> {
    return this.stream(input);
  }

  private async *stream(
    input: AgentInput,
  ): AsyncIterable<AgentEvent> {
    const messages = query({
      prompt: input.prompt,
      options: {
        ...this.options,
        env: {
          ...process.env,
          ANTHROPIC_API_KEY: this.environment.anthropicApiKey,
        },
      },
    });

    for await (const message of messages) {
      yield this.messageMapper.toEvent(message as ClaudeSDKMessage);
    }
  }
}