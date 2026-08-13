import { Action } from "../core/Action.ts";

export interface ToolExecutionResult {
  output: string;
  isError: boolean;
}

export interface ToolExecutor {
  execute(action: Action): Promise<ToolExecutionResult>;
}
