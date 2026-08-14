import Anthropic from '@anthropic-ai/sdk';
import type { AnthropicConfig } from './AnthropicConfigBuilder.ts';
import type { Llm, LlmRequest, LlmResponse } from '../application/ports/llm.ts';
import { AnthropicRequestMapper } from './AnthropicRequestMapper.ts';
import { AnthropicResponseMapper } from './AnthropicResponseMapper.ts';

export class AnthropicClient implements Llm {
  private readonly client: Anthropic;

  constructor(
    private readonly config: AnthropicConfig,
    private readonly requestMapper: AnthropicRequestMapper,
    private readonly responseMapper: AnthropicResponseMapper,
  ) {
    this.client = new Anthropic({
      apiKey: config.apiKey,
    });
  }

  async generate(request: LlmRequest): Promise<LlmResponse> {
    const message = await this.client.messages.create({
      model: this.config.model,
      max_tokens: this.config.maxTokens,
      system: request.system,
      temperature: this.config.temperature,
      tools: this.requestMapper.toTools(request.tools),
      messages: this.requestMapper.toMessages(request.messages),
    });

    return this.responseMapper.toResponse(message);
  }
}
