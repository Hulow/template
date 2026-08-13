import Anthropic from "@anthropic-ai/sdk";
import type { AnthropicConfig } from "./AnthropicConfigBuilder.ts";
import type {
  ContentBlock,
  Llm,
  LlmMessage,
  LlmRequest,
  LlmResponse,
  LlmStopReason,
} from "../application/ports/llm.ts";

export class AnthropicClient implements Llm {
  private readonly client: Anthropic;

  constructor(
    private readonly config: AnthropicConfig,
  ) {
    this.client = new Anthropic();
  }

  async generate(request: LlmRequest): Promise<LlmResponse> {
    const tools: Anthropic.Tool[] = request.tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      input_schema: tool.inputSchema as Anthropic.Tool["input_schema"],
    }));

    const messages: Anthropic.MessageParam[] = request.messages.map(toSdkMessage);

    const message = await this.client.messages.create({
      model: this.config.model,
      max_tokens: this.config.maxTokens,
      system: request.system,
      temperature: this.config.temperature,
      tools,
      messages,
    });

    const content: ContentBlock[] = message.content.flatMap((block): ContentBlock[] => {
      if (block.type === "text") {
        return [{ type: "text", text: block.text }];
      }
      if (block.type === "tool_use") {
        return [{ type: "tool_use", id: block.id, name: block.name, input: block.input }];
      }
      return [];
    });

    return { content, stopReason: toStopReason(message.stop_reason) };
  }
}

function toSdkMessage(message: LlmMessage): Anthropic.MessageParam {
  if (message.role === "user") {
    if (typeof message.content === "string") {
      return { role: "user", content: message.content };
    }
    return {
      role: "user",
      content: message.content.map((result) => ({
        type: "tool_result",
        tool_use_id: result.toolUseId,
        content: result.content,
        is_error: result.isError,
      })),
    };
  }

  return {
    role: "assistant",
    content: message.content.map((block) =>
      block.type === "text"
        ? { type: "text", text: block.text }
        : { type: "tool_use", id: block.id, name: block.name, input: block.input },
    ),
  };
}

function toStopReason(stopReason: Anthropic.StopReason | null): LlmStopReason {
  if (stopReason === "tool_use") return "tool_use";
  if (stopReason === "end_turn") return "end_turn";
  if (stopReason === "max_tokens") return "max_tokens";
  return "other";
}
