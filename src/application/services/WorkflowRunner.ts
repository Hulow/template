import { Workflow } from "../../domain/workflow/Workflow.ts";
import { AgentOrchestrator } from "./AgentOrchestrator.ts";

export class WorkflowRunner {
  constructor(
    private readonly agentOrchestrator: AgentOrchestrator,
  ) {}

  async run(
    workflow: Workflow,
    input: string,
  ): Promise<string> {
    let context = input;

    for (const step of workflow.steps) {
      context = await this.agentOrchestrator.run(
        step.agent,
        context,
      );
    }

    return context;
  }
}