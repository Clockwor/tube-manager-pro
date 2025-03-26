
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

type ChartData = Array<{
  name: string;
  [key: string]: string | number;
}>;

interface AnalyticsChartProps {
  title: string;
  data: ChartData;
  type?: 'line' | 'area' | 'bar';
  dataKeys: Array<{
    key: string;
    color: string;
  }>;
  className?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data,
  type = 'line',
  dataKeys,
  className,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              {dataKeys.map((dataKey) => (
                <linearGradient key={dataKey.key} id={`gradient-${dataKey.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={dataKey.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={dataKey.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#9CA3AF' }} 
              axisLine={{ stroke: '#333' }}
            />
            <YAxis tick={{ fill: '#9CA3AF' }} axisLine={{ stroke: '#333' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                borderColor: '#374151',
                borderRadius: '6px',
                color: '#F9FAFB'
              }} 
            />
            {dataKeys.map((dataKey) => (
              <Area
                key={dataKey.key}
                type="monotone"
                dataKey={dataKey.key}
                stroke={dataKey.color}
                fillOpacity={1}
                fill={`url(#gradient-${dataKey.key})`}
              />
            ))}
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#9CA3AF' }} 
              axisLine={{ stroke: '#333' }}
            />
            <YAxis tick={{ fill: '#9CA3AF' }} axisLine={{ stroke: '#333' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                borderColor: '#374151',
                borderRadius: '6px',
                color: '#F9FAFB' 
              }} 
            />
            {dataKeys.map((dataKey) => (
              <Bar
                key={dataKey.key}
                dataKey={dataKey.key}
                fill={dataKey.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#9CA3AF' }} 
              axisLine={{ stroke: '#333' }}
            />
            <YAxis tick={{ fill: '#9CA3AF' }} axisLine={{ stroke: '#333' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                borderColor: '#374151',
                borderRadius: '6px',
                color: '#F9FAFB'
              }} 
            />
            {dataKeys.map((dataKey) => (
              <Line
                key={dataKey.key}
                type="monotone"
                dataKey={dataKey.key}
                stroke={dataKey.color}
                strokeWidth={2}
                dot={{ r: 3, fill: dataKey.color, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className={`glass-panel rounded-xl p-4 card-shadow ${className}`}>
      <h3 className="text-lg font-medium text-tube-white mb-4">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
