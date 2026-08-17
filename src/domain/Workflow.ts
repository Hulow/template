import { Agent } from "./Agent.ts";

export class Workflow {
  constructor(
    readonly id: string,
    readonly agents: readonly Agent[],
  ) {}
}