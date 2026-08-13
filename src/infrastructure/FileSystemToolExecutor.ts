import fs from "node:fs/promises";
import path from "node:path";
import { Action } from "../application/core/Action.ts";
import { ToolNames } from "../application/core/ToolNames.ts";
import { ToolExecutionResult, ToolExecutor } from "../application/ports/ToolExecutor.ts";

export class FileSystemToolExecutor implements ToolExecutor {
  constructor(
    private readonly workspaceRoot: string,
  ) {}

  async execute(action: Action): Promise<ToolExecutionResult> {
    try {
      switch (action.name) {
        case ToolNames.READ_FILE:
          return await this.readFile(action.input);
        case ToolNames.WRITE_FILE:
          return await this.writeFile(action.input);
        case ToolNames.LIST_FILES:
          return await this.listFiles(action.input);
        default:
          return { output: `Tool "${action.name}" is not supported.`, isError: true };
      }
    } catch (error) {
      return { output: error instanceof Error ? error.message : String(error), isError: true };
    }
  }

  private resolveInWorkspace(target: string): string {
    const resolved = path.resolve(this.workspaceRoot, target);
    const root = this.workspaceRoot.endsWith(path.sep)
      ? this.workspaceRoot
      : this.workspaceRoot + path.sep;

    if (resolved !== this.workspaceRoot && !resolved.startsWith(root)) {
      throw new Error(`Path "${target}" escapes the workspace root.`);
    }

    return resolved;
  }

  private async readFile(input: unknown): Promise<ToolExecutionResult> {
    const relativePath = requireStringField(input, "path");
    const resolved = this.resolveInWorkspace(relativePath);
    const content = await fs.readFile(resolved, "utf-8");
    return { output: content, isError: false };
  }

  private async writeFile(input: unknown): Promise<ToolExecutionResult> {
    const relativePath = requireStringField(input, "path");
    const content = requireStringField(input, "content");
    const resolved = this.resolveInWorkspace(relativePath);

    await fs.mkdir(path.dirname(resolved), { recursive: true });
    await fs.writeFile(resolved, content, "utf-8");

    return { output: `Wrote ${content.length} bytes to ${relativePath}.`, isError: false };
  }

  private async listFiles(input: unknown): Promise<ToolExecutionResult> {
    const relativePath = requireStringField(input, "path");
    const resolved = this.resolveInWorkspace(relativePath);
    const entries = await fs.readdir(resolved, { withFileTypes: true });

    const listing = entries
      .map((entry) => (entry.isDirectory() ? `${entry.name}/` : entry.name))
      .sort()
      .join("\n");

    return { output: listing, isError: false };
  }
}

function requireStringField(input: unknown, field: string): string {
  if (
    typeof input !== "object" ||
    input === null ||
    !(field in input) ||
    typeof (input as Record<string, unknown>)[field] !== "string"
  ) {
    throw new Error(`Expected "${field}" to be a string in tool input.`);
  }

  return (input as Record<string, string>)[field];
}
