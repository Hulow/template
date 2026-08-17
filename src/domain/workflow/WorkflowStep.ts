import { AgentRef } from "../agent/AgentRef.ts";

export interface WorkflowStep {
    id: string;
    agent: AgentRef;
  }