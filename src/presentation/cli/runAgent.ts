import 'dotenv/config';
import { RunAgentUseCase } from '../../application/useCases/RunAgentUseCase.ts';
import { AnthropicClient } from '../../infrastructure/AnthropicClient.ts';
import { AnthropicConfigBuilder } from '../../infrastructure/AnthropicConfigBuilder.ts';
import { FileSystemRuleProvider } from '../../infrastructure/FileSystemRuleProvider.ts';
import { FileSystemToolExecutor } from '../../infrastructure/FileSystemToolExecutor.ts';
import path from 'path';
import { AgentRunner } from '../../application/services/AgentRunner.ts';
import { AgentFactory } from '../../application/AgentFactory.ts';
import { ActionOrchestrator } from '../../application/services/ActionOrchestrator.ts';
import { AgentContextBuilder } from '../../application/AgentContextBuilder.ts';
import { AnthropicRequestMapper } from '../../infrastructure/AnthropicRequestMapper.ts';
import { AnthropicResponseMapper } from '../../infrastructure/AnthropicResponseMapper.ts';
import { readInputFile } from './readInputFile.ts';

const cliInput = process.argv.slice(2).join(' ');
const input = cliInput || readInputFile(path.resolve(import.meta.dirname, 'agent-input'));

if (!input) {
  console.error('Usage: npm run agent -- "your request" (or write your request to agent-input.md)');
  process.exit(1);
}

// ─────────────────────────────────────────────
// Infrastructure configuration
// ─────────────────────────────────────────────
const config = new AnthropicConfigBuilder(process.env.ANTHROPIC_API_KEY!)
  .model('claude-sonnet-5')
  .maxTokens(10000)
  .build();

// ─────────────────────────────────────────────
// Infrastructure implementation
// ─────────────────────────────────────────────
const requestMapper = new AnthropicRequestMapper();
const responseMapper = new AnthropicResponseMapper();
const llm = new AnthropicClient(config, requestMapper, responseMapper);
const rules = new FileSystemRuleProvider(path.resolve('.agent/rules'));
const toolExecutor = new FileSystemToolExecutor(path.resolve('.'));

// ─────────────────────────────────────────────
// Application services
// ─────────────────────────────────────────────
const agentFactory = new AgentFactory();
const agentContextBuilder = new AgentContextBuilder(rules);
const actionOrchestrator = new ActionOrchestrator(toolExecutor);
const agentRunner = new AgentRunner(llm, actionOrchestrator);

// ─────────────────────────────────────────────
// Application use case
// ─────────────────────────────────────────────
const useCase = new RunAgentUseCase(agentFactory, agentContextBuilder, agentRunner);
const agentType = 'implementer';

// ─────────────────────────────────────────────
// Execute
// ─────────────────────────────────────────────
const result = await useCase.execute(agentType, input);
console.log('\n=== Agent Response ===\n');
console.log(result);
