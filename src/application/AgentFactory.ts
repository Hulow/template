import { Agent } from './core/Agent.ts';
import { Goal } from './core/Goal.ts';
import { Tool } from './core/Tool.ts';

export class AgentFactory {
  create(
    type: 'implementer' | 'researcher' | 'architect' | 'ddd' | 'reviewer',
  ): Agent {
    switch (type) {
      case 'implementer':
        return new Agent(
          'Implementer Agent',
          new Goal('Help the user modify and understand code'),
          [],
          [
            Tool.create('read_file'),
            Tool.create('write_file'),
            Tool.create('list_files'),
          ],
        );

      case 'researcher':
        return new Agent(
          'Research Agent',
          new Goal('Research and synthesize information'),
          [],
          [
            Tool.create('search'),
            Tool.create('read_url'),
          ],
        );

      case 'architect':
        return new Agent(
          'Architect Agent',
          new Goal(
            'Analyze the existing software architecture and propose a clear, maintainable target architecture',
          ),
          [],
          [
            Tool.create('list_files'),
            Tool.create('read_file'),
          ],
        );

      case 'ddd':
        return new Agent(
          'DDD Agent',
          new Goal(
            'Analyze the domain model, identify domain concepts and boundaries, and evaluate the architecture using Domain-Driven Design principles',
          ),
          [],
          [
            Tool.create('list_files'),
            Tool.create('read_file'),
          ],
        );

      case 'reviewer':
        return new Agent(
          'Reviewer Agent',
          new Goal(
            'Critically review the architectural and domain analysis, identify inconsistencies, weaknesses, and missing considerations, and provide actionable recommendations',
          ),
          [],
          [
            Tool.create('list_files'),
            Tool.create('read_file'),
          ],
        );
    }
  }
}