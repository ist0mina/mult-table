import React, { FC, memo, useState, useCallback } from "react";
import { Input, Button, Space, Typography } from "antd";
import { trim, isNil } from "lodash";

import { TaskModel } from "../../model/Task.model";

import "./TaskItem.scss";

interface TaskItemProps {
    task: TaskModel;
    saveResult: (result: boolean) => void;
    result?: boolean;
}

export const TaskItem: FC<TaskItemProps> = memo(({ task, saveResult, result }) => {
    const [userResult, setUserResult] = useState<string>("");

    const titleResultBtn = isNil(result) ? "Проверить" : result ? "Верно" : "Не верно";
    const typeResultBtn = isNil(result) ? "default" : "primary";

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUserResult(event.currentTarget.value);
    }, []);

    const check = useCallback(() => {
        if (trim(userResult) !== "" && !Number.isNaN(Number(userResult))) {
            saveResult(task.result === Number(userResult));
        }
    }, [task, userResult, saveResult]);

    return (
        <div className="task-item">
            <Space>
                <Input disabled value={task.operand1} />
                <div className="task-item__sign">*</div>
                <Input disabled value={task.operand2} />
                <div className="task-item__sign">=</div>
                <Input disabled={!isNil(result)} onChange={onChange} className="task-item__result" />
                <Button type={typeResultBtn} onClick={check} danger={result === false}>
                    {titleResultBtn}
                </Button>
            </Space>
            {!isNil(result) && !result && <Typography.Text type="danger">Правильный ответ: {task.result}</Typography.Text>}
        </div>
    );
});
