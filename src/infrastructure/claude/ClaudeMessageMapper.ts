import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";

import type { AgentEvent } from "../../application/events/AgentEvent.ts";

export class ClaudeMessageMapper {
  toEvent(message: SDKMessage): AgentEvent {
    if (message.type === "assistant") {
      const content = message.message.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("");

      return {
        type: "message",
        content,
      };
    }

    if (message.type === "result") {
      return {
        type: "completed",
      };
    }

    return {
      type: "message",
      content: "",
    };
  }
}