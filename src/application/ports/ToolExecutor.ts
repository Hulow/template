import { Tool } from "../core/Tool.ts";

export interface ToolExecutor {
  execute(
    tool: Tool,
    input: unknown,
  ): Promise<unknown>;
}