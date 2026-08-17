// src/presentation/cli/runWorkflow.ts

import path from "node:path";

import { EnvironmentConfig } from "../../infrastructure/config/EnvironmentConfig.ts";
import { ClaudeAgentMapper } from "../../infrastructure/claude/ClaudeAgentMapper.ts";
import { ClaudeMessageMapper } from "../../infrastructure/claude/ClaudeMessageMapper.ts";
import { ClaudeAgentSessionFactory } from "../../infrastructure/claude/ClaudeAgentSessionFactory.ts";
import { ClaudeAgentExecutor } from "../../infrastructure/claude/ClaudeAgentExecutor.ts";

import { NodeFileSystem } from "../../infrastructure/filesystem/NodeFileSystem.ts";
import { RuleLoader } from "../../infrastructure/filesystem/RuleLoader.ts";
import { NodeUserInput } from "../../infrastructure/cli/NodeUserInput.ts";

import { Agent } from "../../domain/Agent.ts";

import { AgentOrchestrator } from "../../application/services/AgentOrchestrator.ts";
import { WorkflowRunner } from "../../application/services/WorkflowRunner.ts";
import { Workflow } from "../../domain/Workflow.ts";

async function main(): Promise<void> {
  console.log("1. Starting");

  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------

  const environment = new EnvironmentConfig();

  console.log("2. Environment loaded");

  // --------------------------------------------------
  // Infrastructure
  // --------------------------------------------------

  const cwd = process.cwd();

  const fileSystem = new NodeFileSystem();
  const ruleLoader = new RuleLoader(fileSystem);

  const rules = await ruleLoader.load(
    path.join(cwd, ".agent/rules"),
  );

  const messageMapper = new ClaudeMessageMapper();
  const userInput = new NodeUserInput();

  // --------------------------------------------------
  // Domain - Agents
  // --------------------------------------------------

  const discoveryAgent = new Agent(
    "ddd-discovery",
    "DDD Discovery",
    [],
    rules,
  );

  const architectureAgent = new Agent(
    "architecture",
    "Architecture",
    [],
    rules,
  );

  const reviewAgent = new Agent(
    "ddd-review",
    "DDD Reviewer",
    [],
    rules,
  );

  // --------------------------------------------------
  // Domain - Workflow
  // --------------------------------------------------

  const workflow = new Workflow(
    "ddd-analysis",
    [
      discoveryAgent,
      architectureAgent,
      reviewAgent,
    ],
  );

  // --------------------------------------------------
  // Agent executor
  // --------------------------------------------------

  const agentMapper = new ClaudeAgentMapper(cwd);

  const sessionFactory = new ClaudeAgentSessionFactory(
    agentMapper,
    messageMapper,
    environment,
    userInput,
  );

  const agentExecutor = new ClaudeAgentExecutor(sessionFactory);

  const agentOrchestrator = new AgentOrchestrator(
    agentExecutor,
  );

  // --------------------------------------------------
  // Workflow runner
  // --------------------------------------------------

  const workflowRunner = new WorkflowRunner(
    agentOrchestrator,
  );

  // --------------------------------------------------
  // Execute
  // --------------------------------------------------

  try {
    const result = await workflowRunner.run(
      workflow,
      "Check the code base and analyze it in terms of DDD.",
      (event) => {
        if (event.type === "message") {
          const { inputTokens, outputTokens } = event.usage;
          console.log(
            `[${event.agentName}] (tokens: in=${inputTokens} out=${outputTokens}) ${event.content}`,
          );
        }
      },
    );

    console.log("\n\n--- workflow done ---");
    console.log(result);
  } finally {
    userInput.close();
  }
}

main().catch((error: unknown) => {
  console.error("FATAL ERROR");
  console.error(error);
  process.exit(1);
});