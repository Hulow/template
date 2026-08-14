export interface AnthropicConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature?: number;
}

export class AnthropicConfigBuilder {
  private _apiKey: string;
  private _model = 'claude-sonnet-5';
  private _maxTokens = 4096;
  private _temperature?: number;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  model(value: string): this {
    this._model = value;
    return this;
  }

  maxTokens(value: number): this {
    this._maxTokens = value;
    return this;
  }

  temperature(value: number): this {
    this._temperature = value;
    return this;
  }

  build(): AnthropicConfig {
    return {
      apiKey: this._apiKey,
      model: this._model,
      maxTokens: this._maxTokens,
      temperature: this._temperature,
    };
  }
}
