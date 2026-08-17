import { AgentState } from "../orchestration/AgentState.ts";
import { AgentDefinition } from "./AgentDefinition.ts";

export class Agent {
    constructor(
      readonly definition: AgentDefinition,
      private state: AgentState,
    ) {}
  
    get id(): string {
      return this.definition.id;
    }
  
    getState(): AgentState {
      return this.state;
    }
  
    updateState(state: AgentState): void {
      this.state = state;
    }
  }