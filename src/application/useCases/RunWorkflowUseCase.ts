import { AgentContextBuilder } from "../AgentContextBuilder.ts";
import { AgentFactory } from "../AgentFactory.ts";
import { Workflow } from "../core/Workflow.ts";
import { WorkflowTask } from "../core/WorkflowTask.ts";
import { WorkflowRunner } from "../services/WorkflowRunner.ts";

export class RunWorkflowUseCase {
    constructor(
      private readonly workflowRunner: WorkflowRunner,
      private readonly agentFactory: AgentFactory,
      private readonly agentContextBuilder: AgentContextBuilder,
    ) {}
  
    async execute(input: string): Promise<{outputs: string[]}> {
      const architect = this.agentFactory.create('architect');
      const ddd = this.agentFactory.create('ddd');
      const reviewer = this.agentFactory.create('reviewer');
  
      const workflow = new Workflow(
        'architecture-review',
        'Architecture Review',
        [
          new WorkflowTask('architect', architect),
          new WorkflowTask('ddd', ddd),
          new WorkflowTask('reviewer', reviewer),
        ],
      );
  
      const context = await this.agentContextBuilder.build(
        architect,
        input,
      );
  
      return this.workflowRunner.run(
        workflow,
        context.system,
        context.messages,
      );
    }
  }