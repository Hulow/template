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

const input =
  process.argv.slice(2).join(' ') || 'in term of DDD, what do you think about my rules?';

if (!input) {
  console.error('Usage: npm run agent -- "your request"');
  process.exit(1);
}

// Infrastructure configuration
const config = new AnthropicConfigBuilder().model('claude-sonnet-5').maxTokens(2024).build();

// Infrastructure implementation
const llm = new AnthropicClient(config);

const rules = new FileSystemRuleProvider(path.resolve('.agent/rules'));

const toolExecutor = new FileSystemToolExecutor(path.resolve('.'));

// Application services

const agentFactory = new AgentFactory();

const agentContextBuilder = new AgentContextBuilder(rules);

const actionOrchestrator = new ActionOrchestrator(toolExecutor);

const agentRunner = new AgentRunner(llm, actionOrchestrator);

// Application use case
const useCase = new RunAgentUseCase(agentFactory, agentContextBuilder, agentRunner);

const agentType = 'code';

// Execute
const result = await useCase.execute(agentType, input);

console.log('\n=== Agent Response ===\n');
console.log(result);
