import { Agent } from "../core/Agent.ts";
import { ContentBlock, Llm, LlmMessage, ToolResultBlock } from "../ports/llm.ts";
import { ActionOrchestrator } from "./ActionOrchestrator.ts";

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
          role: "assistant",
          content: response.content,
        });
  
        if (response.stopReason !== "tool_use") {
          return this.extractText(response.content);
        }
  
        const results = await this.actionOrchestrator.execute(
          response.content,
        );
  
        messages.push({
          role: "user",
          content: results,
        });
      }
  
      return "[Stopped: reached max tool-use iterations]";
    }
  
    private extractText(content: ContentBlock[]): string {
      return content
        .filter(
          (block): block is Extract<ContentBlock, { type: "text" }> =>
            block.type === "text",
        )
        .map((block) => block.text)
        .join("");
    }
  }