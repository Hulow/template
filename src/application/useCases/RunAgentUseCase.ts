import { Agent } from "../core/Agent.ts";
import { Goal } from "../core/Goal.ts";
import { Llm } from "../ports/llm.ts";
import { RuleProvider } from "../ports/RuleProvider.ts";

export class RunAgentUseCase {
    constructor(
      private readonly llm: Llm,
      private readonly ruleProvider: RuleProvider,
    ) {}
  
    async execute(input: string): Promise<string> {
      const agent = new Agent(
        "Agent",
        new Goal("Help the user accomplish their request"),
        [],
        []
      );

      const prompt = 
        `
            You are ${agent.name}.

            Your goal:
            ${agent.goal}

            User request:
            ${input}
        `;
    ;
  
      const rules = await this.ruleProvider.getRules();
  
      const system = rules
        .map((rule) => `## ${rule.name}\n${rule.instruction}`)
        .join("\n\n");
  
      const response = await this.llm.generate({
        system,
        prompt,
        tools: [],
      });
  
      return response.content;
    }
  }