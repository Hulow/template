import { Agent } from "./core/Agent.ts";
import { Goal } from "./core/Goal.ts";
import { Tool } from "./core/Tool.ts";

export class AgentFactory {
    create(type: "code" | "research" | "review"): Agent {
      switch (type) {
        case "code":
          return new Agent(
            "Code Agent",
            new Goal("Help the user modify and understand code"),
            [],
            [
              Tool.create("read_file"),
              Tool.create("write_file"),
              Tool.create("list_files"),
            ],
          );
  
        case "research":
          return new Agent(
            "Research Agent",
            new Goal("Research and synthesize information"),
            [],
            [
              Tool.create("search"),
              Tool.create("read_url"),
            ],
          );
  
        case "review":
          return new Agent(
            "Review Agent",
            new Goal("Review code and identify problems"),
            [],
            [
              Tool.create("read_file"),
            ],
          );
      }
    }
  }