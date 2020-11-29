import React, { FC, memo, useState, useCallback } from 'react';
import { Input, Button } from 'antd';
import { trim } from 'lodash';

import { TaskModel } from '../../model/Task.model';

import './TaskItem.scss';

interface TaskItemProps {
  task: TaskModel;
  saveResult: (result: boolean) => void;
  result?: boolean;
}

export const TaskItem: FC<TaskItemProps> = memo(({ task, saveResult, result }) => {
  const [userResult, setUserResult] = useState<string>('');

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUserResult(event.currentTarget.value);
  }, []);

  const check = useCallback(() => {
    if (trim(userResult) !== '' && !Number.isNaN(Number(userResult))) {
      saveResult(task.result === Number(userResult));
    }
  }, [task, userResult, saveResult]);

  return (
    <div className="task-item">
      <Input disabled value={task.operand1} />
      <div className="task-item__sign">*</div>
      <Input disabled value={task.operand2} />
      <div className="task-item__sign">=</div>
      <Input disabled={result !== undefined} onChange={onChange} />
      <Button type={result === undefined ? 'default' : 'primary'} onClick={check} danger={result === false}>
        {result === undefined ? 'Проверить' : result ? 'Верно' : 'Не верно'}
      </Button>
    </div>
  );
});
