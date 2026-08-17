import { AgentEvent } from "../events/AgentEvent.ts";
import type { AgentInput } from "./AgentExecutor.ts";

export interface AgentSession {
  run(
    input: AgentInput,
  ): AsyncIterable<AgentEvent>;
}