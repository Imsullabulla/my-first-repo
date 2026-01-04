'use client';

import { ExpenseStats } from '@/lib/types';
import { formatCurrency } from '@/lib/formatting';
import { Card } from '@/components/ui/Card';
import { DollarSign, Hash, TrendingUp, Calendar } from 'lucide-react';

interface ExpenseStatsProps {
  stats: ExpenseStats;
}

export function ExpenseStatsCards({ stats }: ExpenseStatsProps) {
  const statCards = [
    {
      title: 'Total Spent',
      value: formatCurrency(stats.total),
      icon: DollarSign,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'This Month',
      value: formatCurrency(stats.thisMonth),
      icon: Calendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Total Expenses',
      value: stats.count.toString(),
      icon: Hash,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Average',
      value: formatCurrency(stats.average),
      icon: TrendingUp,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
