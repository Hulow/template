import {
  query,
  type Options,
  type SDKUserMessage,
} from "@anthropic-ai/claude-agent-sdk";

import type { AgentInput } from "../../application/ports/AgentExecutor.ts";
import type { AgentSession } from "../../application/ports/AgentSession.ts";
import type { AgentEvent } from "../../application/events/AgentEvent.ts";
import type { Environment } from "../../application/ports/Environment.ts";
import type { UserInput } from "../../application/ports/UserInput.ts";
import { Agent } from "../../domain/Agent.ts";

import {
  ClaudeMessageMapper,
  type ClaudeSDKMessage,
} from "./ClaudeMessageMapper.ts";

/*
  Responsability: Query anthropic api and handle each event
*/

export class ClaudeAgentSession implements AgentSession {
  constructor(
    private readonly agent: Agent,
    private readonly options: Options,
    private readonly messageMapper: ClaudeMessageMapper,
    private readonly environment: Environment,
    private readonly userInput: UserInput,
  ) {}

  run(
    input: AgentInput,
  ): AsyncIterable<AgentEvent> {
    return this.stream(input);
  }

  private async *promptStream(
    initialPrompt: string,
  ): AsyncIterable<SDKUserMessage> {
    yield this.toUserMessage(initialPrompt);

    while (true) {
      const reply = (await this.userInput.ask("\n> ")).trim();

      if (reply === "") {
        continue;
      }

      if (reply.toLowerCase() === "exit") {
        return;
      }

      yield this.toUserMessage(reply);
    }
  }

  private toUserMessage(text: string): SDKUserMessage {
    return {
      type: "user",
      message: { role: "user", content: text },
      parent_tool_use_id: null,
    };
  }

  private async *stream(
    input: AgentInput,
  ): AsyncIterable<AgentEvent> {
    const prompt = input.interactive
      ? this.promptStream(input.prompt)
      : input.prompt;

    const messages = query({
      prompt,
      options: {
        ...this.options,
        model: this.environment.model,
        env: {
          ...process.env,
          ANTHROPIC_API_KEY: this.environment.anthropicApiKey,
        },
      },
    });

    for await (const message of messages) {
      const event = this.messageMapper.toEvent(
        message as ClaudeSDKMessage,
        this.agent.name,
      );

      if (event) {
        yield event;
      }
    }
  }
}