export interface LlmRequest {
  prompt: string;
}

export interface LlmResponse {
  content: string;
}

export interface Llm {
  generate(request: LlmRequest): Promise<LlmResponse>;
}
