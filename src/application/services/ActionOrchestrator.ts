import { Action } from '../core/Action.ts';
import { ContentBlock, ToolResultBlock } from '../ports/llm.ts';
import { ToolExecutor } from '../ports/ToolExecutor.ts';

export class ActionOrchestrator {
  constructor(private readonly toolExecutor: ToolExecutor) {}

  async execute(content: ContentBlock[]): Promise<ToolResultBlock[]> {
    const toolUseBlocks = content.filter(
      (block): block is Extract<typeof block, { type: 'tool_use' }> => block.type === 'tool_use',
    );

    const results: ToolResultBlock[] = [];

    for (const block of toolUseBlocks) {
      const action = new Action(block.name, block.input);

      const result = await this.toolExecutor.execute(action);

      results.push({
        type: 'tool_result',
        toolUseId: block.id,
        content: result.output,
        isError: result.isError,
      });
    }

    return results;
  }
}
