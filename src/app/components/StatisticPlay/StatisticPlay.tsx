import React, { FC, memo } from 'react';
import { Statistic } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import './StatisticPlay.scss';

interface StatisticPlayProps {
  right: number;
  wrong: number;
  counTasks: number;
}

export const StatisticPlay: FC<StatisticPlayProps> = memo(({ right, wrong, counTasks }) => {
  return (
    <>
      <h2>Всего задач {counTasks}</h2>
      <div className="statistic">
        <Statistic title="Верно" value={right} prefix={<LikeOutlined />} valueStyle={{ color: '#3f8600' }} />
        <Statistic title="Не верно" value={wrong} prefix={<DislikeOutlined />} valueStyle={{ color: '#cf1322' }} />
      </div>
    </>
  );
});
