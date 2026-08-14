import Anthropic from "@anthropic-ai/sdk";
import { AgentExecutor, AgentInput, AgentOutput, AgentRef } from "../../application/ports/AgentExecutor.ts";



/**
 * Start a session https://platform.claude.com/docs/en/managed-agents/sessions?utm_source=chatgpt.com
 * session event stream: https://platform.claude.com/docs/en/managed-agents/events-and-streaming?utm_source=chatgpt.com
 */
export class AnthropicManagedAgentAdapter implements AgentExecutor {
  constructor(
    private readonly client: Anthropic,
    private readonly environmentId: string,
  ) {}

  async run(
    agent: AgentRef,
    input: AgentInput,
  ): Promise<AgentOutput> {
    const session = await this.client.beta.sessions.create({
      agent: agent.id,
      environment_id: this.environmentId,
      initial_events: [ //lets you create the session and start the agent in one request
        {
          type: "user.message",
          content: [
            {
              type: "text",
              text: input.prompt,
            },
          ],
        },
      ],
    });

    return await this.getResult(session.id)
  }

  private async getResult(
    sessionId: string,
  ): Promise<AgentOutput> {
    const stream =
      await this.client.beta.sessions.events.stream(sessionId);

    const content: string[] = [];

    for await (const event of stream) {
      if (event.type === "agent.message") {
        for (const block of event.content) {
          if (block.type === "text") {
            content.push(block.text);
          }
        }
      }

      if (event.type === "session.status_idle") {
        return {
          content: content.join(""),
        };
      }

      if (event.type === "session.status_terminated") {
        throw new Error(
          `Agent session ${sessionId} terminated unexpectedly`,
        );
      }
    }

    throw new Error(
      `Agent session ${sessionId} ended without producing a result`,
    );
  }
}