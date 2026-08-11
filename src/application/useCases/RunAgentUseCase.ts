import { Agent } from "../core/Agent.ts";
import { Goal } from "../core/Goal.ts";
import { Llm } from "../ports/llm.ts";

export class RunAgentUseCase {
  constructor(
    private readonly llm: Llm,
  ) {}

  async execute(input: string): Promise<string> {
    const agent = new Agent(
      "Agent",
      new Goal("Help the user accomplish their request"),
      [],
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

    const response = await this.llm.generate({
      prompt,
    });

    return response.content;
  }
}