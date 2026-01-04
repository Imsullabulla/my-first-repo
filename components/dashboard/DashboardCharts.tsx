'use client';

import { Expense } from '@/lib/types';
import { CategoryChart } from './CategoryChart';
import { TrendChart } from './TrendChart';
import { MonthlyChart } from './MonthlyChart';

interface DashboardChartsProps {
  expenses: Expense[];
}

export function DashboardCharts({ expenses }: DashboardChartsProps) {
  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Analytics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart expenses={expenses} />
        <MonthlyChart expenses={expenses} />
      </div>
      <TrendChart expenses={expenses} />
    </div>
  );
}
