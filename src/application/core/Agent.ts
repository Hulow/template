import { Capability } from './Capability.ts';
import { Goal } from './Goal.ts';
import { Tool } from './Tool.ts';

export class Agent {
  constructor(
    readonly name: string,
    readonly goal: Goal,
    readonly capabilities: Capability[],
    readonly tools: Tool[],
  ) {}
}
