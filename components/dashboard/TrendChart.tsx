'use client';

import { Expense } from '@/lib/types';
import { calculateTrend } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatting';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';
import { format, parseISO } from 'date-fns';

interface TrendChartProps {
  expenses: Expense[];
  days?: number;
}

export function TrendChart({ expenses, days = 30 }: TrendChartProps) {
  const trendData = calculateTrend(expenses, days);

  if (trendData.length === 0) {
    return null;
  }

  // Format data for display
  const chartData = trendData.map((item) => ({
    date: format(parseISO(item.date), 'MMM dd'),
    amount: item.amount,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Spending Trend (Last {days} Days)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '0.75rem' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Amount']}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
