import type { AgentEvent } from "../../application/events/AgentEvent.ts";
import type { ClaudeSDKMessage } from "./ClaudeSDKMessage.ts";

export class ClaudeMessageMapper {
  toEvent(message: ClaudeSDKMessage): AgentEvent {
    if (message.type === "assistant") {
      const content = message.message.content
        .filter(
          (block): block is { type: "text"; text: string } =>
            block.type === "text",
        )
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