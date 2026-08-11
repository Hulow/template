import "dotenv/config";
import { RunAgentUseCase } from "../../application/useCases/RunAgentUseCase.ts";
import { AnthropicClient } from "../../infrastructure/AnthropicClient.ts";
import { AnthropicConfigBuilder } from "../../infrastructure/AnthropicConfigBuilder.ts";
import { FileSystemRuleProvider } from "../../infrastructure/FileSystemRuleProvider.ts";
import path from "path";

const input = process.argv.slice(2).join(" ") || "in term of DDD, what do you think about my rules?";

if (!input) {
  console.error('Usage: npm run agent -- "your request"');
  process.exit(1);
}

// Infrastructure configuration
const config = new AnthropicConfigBuilder()
  .model("claude-sonnet-5")
  .maxTokens(1024)
  .build();

// Infrastructure implementation of the application port
const llm = new AnthropicClient(config);

const rules = new FileSystemRuleProvider(
  path.resolve(".agent/rules"),
);

// Application use case
const useCase = new RunAgentUseCase(llm, rules);

// Execute
const result = await useCase.execute(input);

console.log("\n=== Agent Response ===\n");
console.log(result);