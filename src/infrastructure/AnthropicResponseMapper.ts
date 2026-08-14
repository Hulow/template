import type Anthropic from '@anthropic-ai/sdk';
import { ContentBlock, LlmResponse, LlmStopReason } from '../application/ports/llm.ts';

export class AnthropicResponseMapper {
  toResponse(message: Anthropic.Message): LlmResponse {
    return {
      content: this.toContent(message.content),
      stopReason: this.toStopReason(message.stop_reason),
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      },
    };
  }

  private toContent(content: Anthropic.ContentBlock[]): ContentBlock[] {
    return content.flatMap((block): ContentBlock[] => {
      if (block.type === 'text') {
        return [
          {
            type: 'text',
            text: block.text,
          },
        ];
      }

      if (block.type === 'tool_use') {
        return [
          {
            type: 'tool_use',
            id: block.id,
            name: block.name,
            input: block.input,
          },
        ];
      }

      return [];
    });
  }

  private toStopReason(stopReason: Anthropic.StopReason | null): LlmStopReason {
    if (stopReason === 'tool_use') return 'tool_use';
    if (stopReason === 'end_turn') return 'end_turn';
    if (stopReason === 'max_tokens') return 'max_tokens';

    return 'other';
  }
}
