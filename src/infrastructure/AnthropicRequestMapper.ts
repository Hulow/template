import type Anthropic from '@anthropic-ai/sdk';
import { LlmMessage } from '../application/ports/llm.ts';
import { Tool } from '../application/core/Tool.ts';

export class AnthropicRequestMapper {
  toTools(tools: Tool[]): Anthropic.Tool[] {
    return tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      input_schema: tool.inputSchema as Anthropic.Tool['input_schema'],
    }));
  }

  toMessages(messages: LlmMessage[]): Anthropic.MessageParam[] {
    return messages.map((message) => this.toMessage(message));
  }

  private toMessage(message: LlmMessage): Anthropic.MessageParam {
    if (message.role === 'user') {
      if (typeof message.content === 'string') {
        return {
          role: 'user',
          content: message.content,
        };
      }

      return {
        role: 'user',
        content: message.content.map((result) => ({
          type: 'tool_result',
          tool_use_id: result.toolUseId,
          content: result.content,
          is_error: result.isError,
        })),
      };
    }

    return {
      role: 'assistant',
      content: message.content.map((block) =>
        block.type === 'text'
          ? {
              type: 'text',
              text: block.text,
            }
          : {
              type: 'tool_use',
              id: block.id,
              name: block.name,
              input: block.input,
            },
      ),
    };
  }
}
