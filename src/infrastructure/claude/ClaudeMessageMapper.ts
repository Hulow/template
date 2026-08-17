import type { AgentEvent } from "../../application/events/AgentEvent.ts";

export type ClaudeSDKMessage =
  | ClaudeAssistantMessage
  | ClaudeResultMessage;

export type ClaudeAssistantMessage = {
  type: "assistant";
  message: {
    content: ClaudeContentBlock[];
    usage: {
      input_tokens: number;
      output_tokens: number;
    };
  };
};

export type ClaudeContentBlock =
  | { type: "text"; text: string }
  | { type: string };

export type ClaudeResultMessage = {
  type: "result";
  subtype: "success" | (string & {});
  is_error: boolean;
  result?: string;
};


export class ClaudeMessageMapper {
  toEvent(message: ClaudeSDKMessage, agentName: string): AgentEvent | null {
    if (message.type === "assistant") {
      const content = message.message.content
        .filter(
          (block): block is { type: "text"; text: string } =>
            block.type === "text",
        )
        .map((block) => block.text)
        .join("");

      if (content === "") {
        return null;
      }

      return {
        type: "message",
        agentName,
        content,
        usage: {
          inputTokens: message.message.usage.input_tokens,
          outputTokens: message.message.usage.output_tokens,
        },
      };
    }

    if (message.type === "result") {
      return {
        type: "completed",
        agentName,
      };
    }

    return null;
  }
}