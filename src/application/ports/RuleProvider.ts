import { Rule } from '../core/Rule.ts';

export interface RuleProvider {
  getRules(): Promise<Rule[]>;
}
