import { Workflow } from "../../domain/Workflow.ts";
import type { AgentEventListener } from "../ports/AgentExecutor.ts";
import { AgentOrchestrator } from "./AgentOrchestrator.ts";

export class WorkflowRunner {
  constructor(
    private readonly agentOrchestrator: AgentOrchestrator,
  ) {}

  async run(
    workflow: Workflow,
    prompt: string,
    onEvent?: AgentEventListener,
  ): Promise<string> {
    let context = prompt;

    for (const agent of workflow.agents) {
      context = await this.agentOrchestrator.run(
        agent,
        context,
        { onEvent },
      );
    }

    return context;
  }
}