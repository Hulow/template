import "dotenv/config";
import { RunAgentUseCase } from "../../application/useCases/RunAgentUseCase.ts";
import { AnthropicClient } from "../../infrastructure/AnthropicClient.ts";
import { AnthropicConfigBuilder } from "../../infrastructure/AnthropicConfigBuilder.ts";

const input = process.argv.slice(2).join(" ") || "Say hello in one sentence. always in a different language";

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

// Application use case
const useCase = new RunAgentUseCase(llm);

// Execute
const result = await useCase.execute(input);

console.log("\n=== Agent Response ===\n");
console.log(result);