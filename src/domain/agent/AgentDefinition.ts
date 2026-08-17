export interface AgentDefinition {
    id: string;
    name: string;
  
    skills: string[];
    rules: string[];
  
    systemPrompt?: string;
  }