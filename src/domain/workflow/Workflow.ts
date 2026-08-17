import { WorkflowStep } from "./WorkflowStep.ts";

export class Workflow {
    constructor(
      readonly id: string,
      readonly steps: readonly WorkflowStep[],
    ) {}
  
    getStep(id: string): WorkflowStep | undefined {
      return this.steps.find(step => step.id === id);
    }
  }