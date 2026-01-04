'use client';

import { Expense } from '@/lib/types';
import { getTopCategories } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatting';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/Card';

interface CategoryChartProps {
  expenses: Expense[];
}

export function CategoryChart({ expenses }: CategoryChartProps) {
  const categoryData = getTopCategories(expenses, 6);

  if (categoryData.length === 0) {
    return null;
  }

  // Prepare data for Recharts
  const chartData = categoryData.map((item) => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage,
  }));

  // Get colors from our constants
  const COLORS = ['#ef4444', '#3b82f6', '#a855f7', '#ec4899', '#eab308', '#6b7280'];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Spending by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
