import 'dotenv/config';
import path from 'node:path';

import { AgentFactory } from '../../application/AgentFactory.ts';
import { AgentContextBuilder } from '../../application/AgentContextBuilder.ts';
import { RunWorkflowUseCase } from '../../application/useCases/RunWorkflowUseCase.ts';
import { AgentRunner } from '../../application/services/AgentRunner.ts';
import { WorkflowRunner } from '../../application/services/WorkflowRunner.ts';
import { ActionOrchestrator } from '../../application/services/ActionOrchestrator.ts';

import { AnthropicClient } from '../../infrastructure/AnthropicClient.ts';
import { AnthropicConfigBuilder } from '../../infrastructure/AnthropicConfigBuilder.ts';
import { AnthropicRequestMapper } from '../../infrastructure/AnthropicRequestMapper.ts';
import { AnthropicResponseMapper } from '../../infrastructure/AnthropicResponseMapper.ts';
import { FileSystemRuleProvider } from '../../infrastructure/FileSystemRuleProvider.ts';
import { FileSystemToolExecutor } from '../../infrastructure/FileSystemToolExecutor.ts';
import { readInputFile } from './readInputFile.ts';

const cliInput = process.argv.slice(2).join(' ');
const input = cliInput || readInputFile(path.resolve(import.meta.dirname, 'workflow-input'));

if (!input) {
  console.error(
    'Usage: npm run workflow -- "your request" (or write your request to workflow-input.md)',
  );
  process.exit(1);
}

// Infrastructure

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  throw new Error('ANTHROPIC_API_KEY is not configured');
}

const config = new AnthropicConfigBuilder(apiKey)
  .model('claude-sonnet-5')
  .maxTokens(2024)
  .build();

const llm = new AnthropicClient(
  config,
  new AnthropicRequestMapper(),
  new AnthropicResponseMapper(),
);

const ruleProvider = new FileSystemRuleProvider(
  path.resolve('.agent/rules'),
);

const toolExecutor = new FileSystemToolExecutor(
  path.resolve('.'),
);

// Application

const agentFactory = new AgentFactory();

const agentContextBuilder = new AgentContextBuilder(
  ruleProvider,
);

const actionOrchestrator = new ActionOrchestrator(
  toolExecutor,
);

const agentRunner = new AgentRunner(
  llm,
  actionOrchestrator,
);

const workflowRunner = new WorkflowRunner(
  agentRunner,
);

const useCase = new RunWorkflowUseCase(
  workflowRunner,
  agentFactory,
  agentContextBuilder,
);

// Execute

const result = await useCase.execute(input);

console.log('\n=== Workflow Result ===\n');

for (const [index, output] of result.outputs.entries()) {
  console.log(`\n--- Agent ${index + 1} ---\n`);
  console.log(output);
}