import type { Agent } from '../core/Agent.ts';
import type { ContentBlock, Llm, LlmMessage } from '../ports/llm.ts';
import { ActionOrchestrator } from './ActionOrchestrator.ts';

export class AgentRunner {
  constructor(
    private readonly llm: Llm,
    private readonly actionOrchestrator: ActionOrchestrator,
    private readonly maxIterations: number = 10,
  ) {}

  async run(
    agent: Agent,
    system: string,
    messages: LlmMessage[],
  ): Promise<string> {
    for (let iteration = 0; iteration < this.maxIterations; iteration++) {
      const response = await this.llm.generate({
        system,
        messages,
        tools: agent.tools,
      });

      messages.push({
        role: 'assistant',
        content: response.content,
      });

      const toolCalls = response.content.filter(
        (block) => block.type === 'tool_use',
      );

      console.error(
        `[agent] iteration=${iteration + 1}/${this.maxIterations} ` +
        `stopReason=${response.stopReason} ` +
        `toolCalls=${toolCalls.length}`,
      );

      if (toolCalls.length > 0) {
        const results = await this.actionOrchestrator.execute(
          response.content,
        );

        messages.push({
          role: 'user',
          content: results,
        });

        continue;
      }

      return this.extractResponse(
        response.content,
        response.stopReason,
      );
    }

    return '[Stopped: reached max tool-use iterations]';
  }

  private extractResponse(
    content: ContentBlock[],
    stopReason: string,
  ): string {
    const text = this.extractText(content);

    if (stopReason === 'max_tokens') {
      return text || '[Response was cut off by the token limit before it could finish]';
    }

    return text;
  }

  private extractText(content: ContentBlock[]): string {
    return content
      .filter(
        (block): block is Extract<ContentBlock, { type: 'text' }> =>
          block.type === 'text',
      )
      .map((block) => block.text)
      .join('');
  }
}