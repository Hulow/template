import Anthropic from "@anthropic-ai/sdk";
import type { AnthropicConfig } from "./AnthropicConfigBuilder.ts";
import type { Llm, LlmRequest, LlmResponse } from "../application/ports/llm.ts";

export class AnthropicClient implements Llm {
  private readonly client: Anthropic;

  constructor(
    private readonly config: AnthropicConfig,
  ) {
    this.client = new Anthropic();
  }

  async generate(request: LlmRequest): Promise<LlmResponse> {
    const message = await this.client.messages.create({
      model: this.config.model,
      max_tokens: this.config.maxTokens,
      system: request.system,
      temperature: this.config.temperature,
      messages: [
        {
          role: "user",
          content: request.prompt,
        },
      ],
    });

    return {
      content: message.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join(""),
    };
  }
}