// presentation/cli/runAgent.ts

import path from "node:path";

import { EnvironmentConfig } from "../../infrastructure/config/EnvironmentConfig.ts";
import { ClaudeAgentMapper } from "../../infrastructure/claude/ClaudeAgentMapper.ts";
import { ClaudeMessageMapper } from "../../infrastructure/claude/ClaudeMessageMapper.ts";
import { ClaudeAgentSession } from "../../infrastructure/claude/ClaudeAgentSession.ts";
import { ClaudeAgentExecutor } from "../../infrastructure/claude/ClaudeAgentExecutor.ts";
import { AgentOrchestrator } from "../../application/services/AgentOrchestrator.ts";
import { NodeFileSystem } from "../../infrastructure/filesystem/NodeFileSystem.ts";
import { RuleLoader } from "../../infrastructure/filesystem/RuleLoader.ts";
import { Agent } from "../../domain/Agent.ts";

async function main(): Promise<void> {
  console.log("1. Starting");

  // Configuration
  const environment = new EnvironmentConfig();

  console.log("2. Environment loaded");

  // Infrastructure
  const cwd = process.cwd();
  const fileSystem = new NodeFileSystem();
  const ruleLoader = new RuleLoader(fileSystem);
  const rules = await ruleLoader.load(path.join(cwd, ".agent/rules"));

  // Domain
  const agent = new Agent(
    "ddd-discovery",
    "Discover",
    [],
    rules,
  );

  const agentMapper = new ClaudeAgentMapper(cwd);
  const options = agentMapper.toOptions(agent);
  const messageMapper = new ClaudeMessageMapper();
  const session = new ClaudeAgentSession(
    agent,
    options,
    messageMapper,
    environment,
  );
  const executor = new ClaudeAgentExecutor(session);
  const orchestrator = new AgentOrchestrator(executor);
  const result = await orchestrator.run(
    agent,
    "Check the code base and in term of DDD, what do you think",
    (event) => {
      if (event.type === "message") {
        const { inputTokens, outputTokens } = event.usage;
        console.log(
          `[${event.agentName}] (tokens: in=${inputTokens} out=${outputTokens}) ${event.content}`,
        );
      }
    },
  );

  console.log("\n\n--- done ---");
  console.log(result);
}

main().catch((error: unknown) => {
  console.error("FATAL ERROR");
  console.error(error);
  process.exit(1);
});