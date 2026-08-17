import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { UserInput } from "../../application/ports/UserInput.ts";

export class NodeUserInput implements UserInput {
  private readonly rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  async ask(question: string): Promise<string> {
    return this.rl.question(question);
  }

  close(): void {
    this.rl.close();
  }
}
