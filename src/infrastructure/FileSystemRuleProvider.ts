import fs from 'node:fs/promises';
import path from 'node:path';
import { RuleProvider } from '../application/ports/RuleProvider.ts';
import { Rule } from '../application/core/Rule.ts';

export class FileSystemRuleProvider implements RuleProvider {
  constructor(private readonly rulesDirectory: string) {}

  async getRules(): Promise<Rule[]> {
    const files = await fs.readdir(this.rulesDirectory);

    const markdownFiles = files.filter((file) => file.endsWith('.md')).sort();

    return Promise.all(
      markdownFiles.map(async (file) => {
        const instruction = await fs.readFile(path.join(this.rulesDirectory, file), 'utf-8');

        const name = path.basename(file, '.md');

        return new Rule(name, instruction);
      }),
    );
  }
}
