import { Capability } from "./Capability.ts";
import { Goal } from "./Goal.ts";

export class Agent {
    constructor(
      readonly name: string,
      readonly goal: Goal,
      readonly capabilities: Capability[],
    ) {}
  }