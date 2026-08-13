import { ToolName, ToolNames } from './ToolNames.ts';
import { ToolSchemas } from './ToolSchemas.ts';

export interface ToolDefinition {
  name: ToolName;
  description: string;
  inputSchema: unknown;
}

export class Tool {
  private constructor(
    readonly name: ToolName,
    readonly description: string,
    readonly inputSchema: unknown,
  ) {}

  static create(name: string): Tool {
    if (!Object.values(ToolNames).includes(name as ToolName)) {
      throw new Error(`Invalid tool name: "${name}"`);
    }

    const toolName = name as ToolName;

    const definition = ToolSchemas[toolName];

    return new Tool(definition.name, definition.description, definition.inputSchema);
  }
}
