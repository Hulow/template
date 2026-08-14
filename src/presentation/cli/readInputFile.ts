import { readFileSync } from 'node:fs';
import path from 'node:path';

export function readInputFile(basePath: string): string {
  for (const extension of ['.md', '.txt']) {
    const filePath = `${basePath}${extension}`;
    try {
      return readFileSync(filePath, 'utf-8').trim();
    } catch {
      continue;
    }
  }

  throw new Error(
    `No input file found at ${path.basename(basePath)}.md or ${path.basename(basePath)}.txt`,
  );
}
