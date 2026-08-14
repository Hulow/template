import { Workflow } from '../core/Workflow.ts';
import type { LlmMessage } from '../ports/llm.ts';
import { AgentRunner } from './AgentRunner.ts';

export class WorkflowRunner {
  constructor(private readonly agentRunner: AgentRunner) {}

  async run(
    workflow: Workflow,
    system: string,
    messages: LlmMessage[],
  ): Promise<{
    outputs: string[];
  }> {
    const outputs: string[] = [];

    for (const task of workflow.tasks) {
      const output = await this.agentRunner.run(task.agent, system, messages);

      outputs.push(output);

      messages.push({
        role: 'user',
        content: output,
      });
    }

    return {
      outputs,
    };
  }
}
