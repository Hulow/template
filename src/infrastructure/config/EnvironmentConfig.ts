import "dotenv/config";
import { Environment } from "../../application/ports/Environment.ts";

export class EnvironmentConfig implements Environment {
  readonly anthropicApiKey: string;
  readonly model: string;

  constructor() {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

    if (!anthropicApiKey) {
      throw new Error(
        "Missing required environment variable: ANTHROPIC_API_KEY",
      );
    }

    this.anthropicApiKey = anthropicApiKey;
    this.model = "claude-haiku-4-5";
  }
}