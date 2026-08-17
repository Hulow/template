export interface UserInput {
  ask(question: string): Promise<string>;
  close(): void;
}
