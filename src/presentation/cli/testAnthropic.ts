import "dotenv/config";
import { AnthropicClient } from "../../infrastructure/AnthropicClient.ts";
import { TestLlmUseCase } from "../../application/useCases/TestLlmUseCase.ts";
import { AnthropicConfigBuilder } from "../../infrastructure/AnthropicConfigBuilder.ts";

const prompt = process.argv.slice(2).join(" ") || "Say hello in one sentence. always in a different language";

const anthropicConfig = new AnthropicConfigBuilder()
  .model("claude-sonnet-5")
  .maxTokens(1096)
  .build();

const anthropicClient = new AnthropicClient(anthropicConfig);
const useCase = new TestLlmUseCase(anthropicClient);

const response = await useCase.execute(prompt);
console.log(response);
