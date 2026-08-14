import type { Agent } from '../core/Agent.ts';
import type { ContentBlock, Llm, LlmMessage } from '../ports/llm.ts';
import { ActionOrchestrator } from './ActionOrchestrator.ts';

export class AgentRunner {
  constructor(
    private readonly llm: Llm,
    private readonly actionOrchestrator: ActionOrchestrator,
  ) {}

  async run(
    agent: Agent,
    system: string,
    messages: LlmMessage[],
  ): Promise<string> {
    let iteration = 0;

    while (true) {
      iteration++;

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
      console.log('#----------------------------------#')
      console.error(
        `[${agent.name}] iteration=${iteration} ` +
          `stopReason=${response.stopReason} ` +
          `toolCalls=${toolCalls.length} ` +
          `inputTokens=${response.usage.inputTokens} ` +
          `outputTokens=${response.usage.outputTokens}`,
      );
      console.log('#----------------------------------#')

      if (toolCalls.length > 0) {
        this.logToolCalls(agent, toolCalls);
        const results = await this.actionOrchestrator.execute(toolCalls);

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
  }

  private extractResponse(
    content: ContentBlock[],
    stopReason: string,
  ): string {
    const text = this.extractText(content);

    if (stopReason === 'max_tokens') {
      console.error(
        '[agent] response was cut off by the token limit',
      );

      return text || '[Response was cut off by the token limit]';
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

  private logToolCalls(agent: Agent, toolCalls: ContentBlock[]): void {
    console.error(`[${agent.name}] executing ${toolCalls.length} tool(s)`);
  
    for (const toolCall of toolCalls) {
      if (toolCall.type !== 'tool_use') continue;
  
      console.error(
        `[${agent.name}] → ${toolCall.name} ${JSON.stringify(toolCall.input)}`,
      );
    }
  }
}