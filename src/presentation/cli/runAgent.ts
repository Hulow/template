import "dotenv/config";
import { ClaudeAgentAdapter } from "../../infrastructure/anthropic/ClaudeAgentAdapter.ts";

async function main() {
  const runtime = new ClaudeAgentAdapter();

  const result = await runtime.run(
    {
      id: "domain-analyst",
    },
    {
      prompt: "Analyze this project and explain its architecture.",
    },
  );

  console.log(result.content);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});