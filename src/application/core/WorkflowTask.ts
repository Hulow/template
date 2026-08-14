import type { Agent } from './Agent.ts';

export class WorkflowTask {
  constructor(
    readonly id: string,
    readonly agent: Agent,
  ) {}
}
