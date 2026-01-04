'use client';

import { Expense } from '@/lib/types';
import { getMonthlyData } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatting';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';

interface MonthlyChartProps {
  expenses: Expense[];
  months?: number;
}

export function MonthlyChart({ expenses, months = 6 }: MonthlyChartProps) {
  const monthlyData = getMonthlyData(expenses, months);

  if (monthlyData.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Monthly Spending (Last {months} Months)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="month"
            stroke="#9ca3af"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '0.75rem' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Total']}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Bar
            dataKey="amount"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
