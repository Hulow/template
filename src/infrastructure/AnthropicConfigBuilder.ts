export interface AnthropicConfig {
  model: string;
  maxTokens: number;
  temperature?: number;
}

export class AnthropicConfigBuilder {
  private _model = 'claude-sonnet-5';
  private _maxTokens = 4096;
  private _temperature?: number;

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
      model: this._model,
      maxTokens: this._maxTokens,
      temperature: this._temperature,
    };
  }
}
