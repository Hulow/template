import { promises as fs } from "node:fs";

import { FileSystem } from "../../application/ports/FileSystem.ts";

export class NodeFileSystem implements FileSystem {
  async listFiles(dir: string): Promise<string[]> {
    return fs.readdir(dir);
  }

  async readFile(path: string): Promise<string> {
    return fs.readFile(path, "utf-8");
  }
}
