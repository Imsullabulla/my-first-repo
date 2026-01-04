import { Expense, ExpenseStats, Category, CategoryData, TrendData, MonthlyData } from './types';
import { startOfMonth, endOfMonth, parseISO, format, startOfDay, subDays } from 'date-fns';

/**
 * Calculate comprehensive statistics from expenses
 */
export function calculateStats(expenses: Expense[]): ExpenseStats {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const count = expenses.length;
  const average = count > 0 ? total / count : 0;

  // Calculate by category
  const byCategory: Record<Category, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach((exp) => {
    byCategory[exp.category] += exp.amount;
  });

  // Calculate by month
  const byMonth: Record<string, number> = {};
  expenses.forEach((exp) => {
    const monthKey = format(parseISO(exp.date), 'yyyy-MM');
    byMonth[monthKey] = (byMonth[monthKey] || 0) + exp.amount;
  });

  // Calculate this month's total
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const thisMonth = expenses
    .filter((exp) => {
      const expDate = parseISO(exp.date);
      return expDate >= monthStart && expDate <= monthEnd;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  return {
    total,
    count,
    average,
    byCategory,
    byMonth,
    thisMonth,
  };
}

/**
 * Group expenses by category
 */
export function groupByCategory(expenses: Expense[]): Record<Category, Expense[]> {
  const grouped: Record<Category, Expense[]> = {
    Food: [],
    Transportation: [],
    Entertainment: [],
    Shopping: [],
    Bills: [],
    Other: [],
  };

  expenses.forEach((exp) => {
    grouped[exp.category].push(exp);
  });

  return grouped;
}

/**
 * Group expenses by month
 */
export function groupByMonth(expenses: Expense[]): Record<string, Expense[]> {
  const grouped: Record<string, Expense[]> = {};

  expenses.forEach((exp) => {
    const monthKey = format(parseISO(exp.date), 'yyyy-MM');
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(exp);
  });

  return grouped;
}

/**
 * Calculate trend data for the last N days
 */
export function calculateTrend(expenses: Expense[], days: number = 30): TrendData[] {
  const endDate = startOfDay(new Date());
  const startDate = subDays(endDate, days - 1);

  const dailyTotals: Record<string, number> = {};

  // Initialize all days with 0
  for (let i = 0; i < days; i++) {
    const date = subDays(endDate, days - 1 - i);
    const dateKey = format(date, 'yyyy-MM-dd');
    dailyTotals[dateKey] = 0;
  }

  // Sum expenses by day
  expenses.forEach((exp) => {
    const expDate = parseISO(exp.date);
    if (expDate >= startDate && expDate <= endDate) {
      const dateKey = format(expDate, 'yyyy-MM-dd');
      dailyTotals[dateKey] = (dailyTotals[dateKey] || 0) + exp.amount;
    }
  });

  // Convert to array format for charts
  return Object.entries(dailyTotals)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Get top categories by spending
 */
export function getTopCategories(expenses: Expense[], limit: number = 5): CategoryData[] {
  const byCategory = groupByCategory(expenses);
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryData: CategoryData[] = Object.entries(byCategory).map(
    ([category, exps]) => {
      const amount = exps.reduce((sum, exp) => sum + exp.amount, 0);
      const count = exps.length;
      const percentage = total > 0 ? (amount / total) * 100 : 0;

      return {
        category: category as Category,
        amount,
        count,
        percentage,
      };
    }
  );

  return categoryData
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

/**
 * Get monthly data for the last N months
 */
export function getMonthlyData(expenses: Expense[], months: number = 6): MonthlyData[] {
  const monthlyTotals: Record<string, number> = {};

  expenses.forEach((exp) => {
    const monthKey = format(parseISO(exp.date), 'yyyy-MM');
    monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + exp.amount;
  });

  // Get last N months
  const result: MonthlyData[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = format(date, 'yyyy-MM');
    const monthLabel = format(date, 'MMM yyyy');

    result.push({
      month: monthLabel,
      amount: monthlyTotals[monthKey] || 0,
    });
  }

  return result;
}
