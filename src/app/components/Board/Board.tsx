import React, { FC, memo, useState, useCallback } from "react";
import { Button } from "antd";

import { TaskItem } from "../TaskItem";
import { TaskModel } from "../../model/Task.model";
import { generateTaskList, countResults } from "../../engine";
import { StatisticPlay } from "../StatisticPlay";

import "./Board.scss";

const COUNT_TASKS = 20;

export const Board: FC = memo(() => {
    const [taskList, setTaskList] = useState<TaskModel[]>([]);
    const [userResults, setUserResults] = useState<{ [key: string]: boolean }>({});
    const [isPlay, setIsPlay] = useState<boolean>(false);

    const titleBtn = isPlay ? "Начать заново" : "Начать";

    const start = useCallback(() => {
        setTaskList(generateTaskList(COUNT_TASKS));
        setIsPlay(true);
        setUserResults({});
    }, []);

    return (
        <section className="container">
            {isPlay && <StatisticPlay right={countResults(true, userResults)} wrong={countResults(false, userResults)} counTasks={COUNT_TASKS} />}
            <div>
                <Button onClick={start}>{titleBtn}</Button>
            </div>
            <section className="task-list">
                {taskList.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        saveResult={(result: boolean) => setUserResults({ ...userResults, [task.id]: result })}
                        result={userResults[task.id]}
                    />
                ))}
            </section>
        </section>
    );
});
