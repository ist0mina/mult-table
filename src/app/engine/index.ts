import { TaskModel } from '../model/Task.model';
import { times, random, uniqueId, filter } from 'lodash';

export const generateTaskList = (length: number): TaskModel[] =>
  times(length, () => {
    const operand1 = random(1, 9);
    const operand2 = random(1, 9);
    return { id: uniqueId(), operand1, operand2, result: operand1 * operand2 };
  });

export const countResults = (right: boolean, results: { [key: string]: boolean }) => {
  const resultArray = Object.values(results);
  return resultArray.filter((res) => res === right).length;
};
