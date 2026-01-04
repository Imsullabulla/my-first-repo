// Core type definitions for the expense tracker application

export type Category =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  date: string; // ISO date string
  amount: number;
  category: Category;
  description: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface ExpenseFormData {
  date: Date;
  amount: string; // String during input for better UX
  category: Category;
  description: string;
}

export interface ValidationErrors {
  date?: string;
  amount?: string;
  category?: string;
  description?: string;
}

export interface ExpenseFilters {
  searchQuery: string;
  category: Category | 'All';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
}

export interface ExpenseStats {
  total: number;
  count: number;
  average: number;
  byCategory: Record<Category, number>;
  byMonth: Record<string, number>;
  thisMonth: number;
}

export interface CategoryData {
  category: Category;
  amount: number;
  count: number;
  percentage: number;
}

export interface TrendData {
  date: string;
  amount: number;
}

export interface MonthlyData {
  month: string;
  amount: number;
}
