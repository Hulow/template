import { Agent } from './core/Agent.ts';
import { LlmMessage } from './ports/llm.ts';
import { RuleProvider } from './ports/RuleProvider.ts';

export interface AgentContext {
  system: string;
  messages: LlmMessage[];
}

const AGENT_RUNTIME_INSTRUCTIONS = `
You are an autonomous agent.

Accomplish the user's request by using your available tools directly.
Do not merely describe what you are going to do.

Only respond with plain text once the task is complete.
If you need clarification that cannot be resolved using your tools, ask for it.
`.trim();

export class AgentContextBuilder {
  constructor(private readonly ruleProvider: RuleProvider) {}

  async build(agent: Agent, input: string): Promise<AgentContext> {
    const rules = await this.ruleProvider.getRules();

    const system = [
      AGENT_RUNTIME_INSTRUCTIONS,
      ...rules.map((rule) => `## ${rule.name}\n${rule.instruction}`),
    ].join('\n\n');

    const prompt = `
      You are ${agent.name}.

      Your goal:
      ${agent.goal.description}

      User request:
      ${input}
    `;

    return {
      system,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    };
  }
}
