import { Agent } from "../../domain/Agent.ts";
import type { AgentSession } from "./AgentSession.ts";

export interface AgentSessionFactory {
  create(agent: Agent): AgentSession;
}
