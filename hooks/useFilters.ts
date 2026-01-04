'use client';

import { useState, useMemo } from 'react';
import { Expense, ExpenseFilters, Category } from '@/lib/types';
import { parseISO } from 'date-fns';

export function useFilters(expenses: Expense[]) {
  const [filters, setFilters] = useState<ExpenseFilters>({
    searchQuery: '',
    category: 'All',
    dateRange: {
      start: null,
      end: null,
    },
    sortBy: 'date',
    sortOrder: 'desc',
  });

  /**
   * Set search query
   */
  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  /**
   * Set category filter
   */
  const setCategory = (category: Category | 'All') => {
    setFilters((prev) => ({ ...prev, category }));
  };

  /**
   * Set date range filter
   */
  const setDateRange = (start: Date | null, end: Date | null) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start, end },
    }));
  };

  /**
   * Set sorting
   */
  const setSorting = (sortBy: ExpenseFilters['sortBy'], sortOrder: ExpenseFilters['sortOrder']) => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  /**
   * Reset all filters
   */
  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      dateRange: {
        start: null,
        end: null,
      },
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  /**
   * Apply filters and sorting (memoized)
   */
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((exp) =>
        exp.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category !== 'All') {
      result = result.filter((exp) => exp.category === filters.category);
    }

    // Apply date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      result = result.filter((exp) => {
        const expDate = parseISO(exp.date);
        const start = filters.dateRange.start;
        const end = filters.dateRange.end;

        if (start && end) {
          return expDate >= start && expDate <= end;
        } else if (start) {
          return expDate >= start;
        } else if (end) {
          return expDate <= end;
        }
        return true;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [expenses, filters]);

  return {
    filters,
    setSearchQuery,
    setCategory,
    setDateRange,
    setSorting,
    resetFilters,
    filteredExpenses,
  };
}
