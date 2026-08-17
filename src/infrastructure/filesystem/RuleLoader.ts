import path from "node:path";

import { FileSystem } from "../../application/ports/FileSystem.ts";

export class RuleLoader {
  constructor(
    private readonly fileSystem: FileSystem,
  ) {}

  async load(dir: string): Promise<string[]> {
    const entries = await this.fileSystem.listFiles(dir);

    const files = entries
      .filter((entry) => entry.endsWith(".md"))
      .sort();

    const contents = await Promise.all(
      files.map((file) =>
        this.fileSystem.readFile(path.join(dir, file)),
      ),
    );

    return contents.map((content) => content.trim());
  }
}
