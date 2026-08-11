import { Tool } from "../core/Tool.ts";

export interface LlmRequest {
  system: string;
  prompt: string;
  tools: Tool[];
}

export interface LlmResponse {
  content: string;
}

export interface Llm {
  generate(request: LlmRequest): Promise<LlmResponse>;
}
