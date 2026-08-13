import { AgentContextBuilder } from '../AgentContextBuilder.ts';
import { AgentFactory } from '../AgentFactory.ts';
import { AgentRunner } from '../services/AgentRunner.ts';

export class RunAgentUseCase {
  constructor(
    private readonly agentFactory: AgentFactory,
    private readonly contextBuilder: AgentContextBuilder,
    private readonly agentRunner: AgentRunner,
  ) {}

  async execute(agentType: 'code' | 'research' | 'review', input: string): Promise<string> {
    const agent = this.agentFactory.create(agentType);

    const context = await this.contextBuilder.build(agent, input);

    return this.agentRunner.run(agent, context.system, context.messages);
  }
}
