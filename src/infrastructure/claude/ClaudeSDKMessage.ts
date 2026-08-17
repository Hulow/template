export type ClaudeSDKMessage =
  | ClaudeAssistantMessage
  | ClaudeResultMessage;

export type ClaudeAssistantMessage = {
  type: "assistant";
  message: {
    content: ClaudeContentBlock[];
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
