import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: 'May 5th', usage: 13 },
  { date: 'May 6th', usage: 15 },
  { date: 'May 7th', usage: 19 },
  { date: 'May 8th', usage: 11 },
  { date: 'May 9th', usage: 23 },
  { date: 'May 10th', usage: 28 },
  { date: 'May 11th', usage: 10 },
];

const WeeklyUsageChart: React.FC = () => (
  <>
    <h4>Weekly Usage</h4>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="usage" stroke="#8884d8" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  </>
);

export default WeeklyUsageChart;
