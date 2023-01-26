import { ICreateTaskBody } from '@map-colonies/mc-priority-queue';
import config from 'config';
import { ITaskParameters } from './interfaces';

export const filesToTasks = (files: string[]): ICreateTaskBody<ITaskParameters>[] => {
  const tasks: ICreateTaskBody<ITaskParameters>[] = [];
  const batchSize = config.get<number>('exporter.batches');
  for (let i = 0; i < files.length; i += batchSize) {
    const parameters: ITaskParameters = { paths: files.slice(i, i + batchSize) };
    const task: ICreateTaskBody<ITaskParameters> = {
      type: config.get<string>('worker.taskType'),
      parameters,
    };
    tasks.push(task);
  }
  return tasks;
};
