// presentation/cli/runAgent.ts

import { EnvironmentConfig } from "../../infrastructure/config/EnvironmentConfig.ts";
import { ClaudeAgentMapper } from "../../infrastructure/claude/ClaudeAgentMapper.ts";
import { ClaudeMessageMapper } from "../../infrastructure/claude/ClaudeMessageMapper.ts";
import { ClaudeAgentSession } from "../../infrastructure/claude/ClaudeAgentSession.ts";
import { ClaudeAgentExecutor } from "../../infrastructure/claude/ClaudeAgentExecutor.ts";
import { AgentOrchestrator } from "../../application/services/AgentOrchestrator.ts";
import { Agent } from "../../domain/agent/Agent.ts";

async function main(): Promise<void> {
  console.log("1. Starting");

  // Configuration
  const environment = new EnvironmentConfig();

  console.log("2. Environment loaded");

  // Domain
  const agent = new Agent('ddd-discovery', 'Discover')

  // Infrastructure
  const cwd = process.cwd();
  const agentMapper = new ClaudeAgentMapper(cwd);
  const options = agentMapper.toOptions(agent);
  const messageMapper = new ClaudeMessageMapper();
  const session = new ClaudeAgentSession(
    options,
    messageMapper,
    environment,
  );
  const executor = new ClaudeAgentExecutor(session);
  const orchestrator = new AgentOrchestrator(executor);
  const result = await orchestrator.run(
    agent,
    "Check the code base and in term of DDD, what do you think",
  );

  console.log("13. Result:");
  console.log(result);
}

main().catch((error: unknown) => {
  console.error("FATAL ERROR");
  console.error(error);
  process.exit(1);
});