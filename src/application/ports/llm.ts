import { Tool } from "../core/Tool.ts";

export interface ToolResultBlock {
  type: "tool_result";
  toolUseId: string;
  content: string;
  isError: boolean;
}

export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "tool_use"; id: string; name: string; input: unknown };

export type LlmMessage =
  | { role: "user"; content: string | ToolResultBlock[] }
  | { role: "assistant"; content: ContentBlock[] };

export type LlmStopReason = "tool_use" | "end_turn" | "max_tokens" | "other";

export interface LlmRequest {
  system: string;
  messages: LlmMessage[];
  tools: Tool[];
}

export interface LlmResponse {
  content: ContentBlock[];
  stopReason: LlmStopReason;
}

export interface Llm {
  generate(request: LlmRequest): Promise<LlmResponse>;
}