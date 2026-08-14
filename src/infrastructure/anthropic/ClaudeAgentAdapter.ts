import { query } from "@anthropic-ai/claude-agent-sdk";
import {
  AgentExecutor,
  AgentInput,
  AgentOutput,
  AgentRef,
} from "../../application/ports/AgentExecutor.ts";

export class ClaudeAgentAdapter implements AgentExecutor {
  async run(
    _agent: AgentRef,
    input: AgentInput,
  ): Promise<AgentOutput> {
    console.log("Starting Claude Agent SDK...");
    console.log("cwd:", process.cwd());

    let result = "";

    const messages = query({
      prompt: input.prompt,
      options: {
        cwd: process.cwd(),
      },
    });

    console.log("Query created, waiting for messages...");

    for await (const message of messages) {
      console.log("MESSAGE:", message);

      if (message.type === "result" && message.subtype === "success") {
        result = message.result;
      }
    }

    console.log("Agent finished.");

    return {
      content: result,
    };
  }
}