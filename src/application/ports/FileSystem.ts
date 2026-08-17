export interface FileSystem {
  listFiles(dir: string): Promise<string[]>;
  readFile(path: string): Promise<string>;
}
