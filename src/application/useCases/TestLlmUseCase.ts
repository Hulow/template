import { Llm } from "../ports/llm.ts";

export class TestLlmUseCase {
  constructor(
    private readonly llm: Llm,
  ) {}

  async execute(prompt: string): Promise<string> {
    const response = await this.llm.generate({
      prompt,
    });

    return response.content;
  }
}