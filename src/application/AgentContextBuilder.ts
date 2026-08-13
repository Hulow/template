import { Agent } from './core/Agent.ts';
import { LlmMessage } from './ports/llm.ts';
import { RuleProvider } from './ports/RuleProvider.ts';

export interface AgentContext {
  system: string;
  messages: LlmMessage[];
}

export class AgentContextBuilder {
  constructor(private readonly ruleProvider: RuleProvider) {}

  async build(agent: Agent, input: string): Promise<AgentContext> {
    const rules = await this.ruleProvider.getRules();

    const behavior =
      "You are an autonomous agent. Always accomplish the user's request by calling your available tools directly — do not merely describe what you are about to do. Only respond with plain text once the task is fully complete, or if you need clarification you cannot resolve yourself.";

    const system = [behavior, ...rules.map((rule) => `## ${rule.name}\n${rule.instruction}`)].join(
      '\n\n',
    );

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
