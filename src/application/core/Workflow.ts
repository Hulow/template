import type { WorkflowTask } from './WorkflowTask.ts';

export class Workflow {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly tasks: readonly WorkflowTask[],
  ) {
    if (tasks.length === 0) {
      throw new Error('A workflow must contain at least one task');
    }
  }

  getTask(id: string): WorkflowTask {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new Error(`Workflow task "${id}" not found`);
    }

    return task;
  }
}
