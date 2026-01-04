'use client';

import { useState, useEffect, useMemo } from 'react';
import { Expense, ExpenseFormData, ExpenseStats } from '@/lib/types';
import { useLocalStorage } from './useLocalStorage';
import { calculateStats } from '@/lib/calculations';
import { STORAGE_KEY } from '@/lib/constants';

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(STORAGE_KEY, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    setLoading(false);
  }, []);

  /**
   * Add a new expense
   */
  const addExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      date: data.date.toISOString(),
      amount: parseFloat(data.amount),
      category: data.category,
      description: data.description.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setExpenses([newExpense, ...expenses]);
  };

  /**
   * Update an existing expense
   */
  const updateExpense = (id: string, data: ExpenseFormData) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              date: data.date.toISOString(),
              amount: parseFloat(data.amount),
              category: data.category,
              description: data.description.trim(),
              updatedAt: new Date().toISOString(),
            }
          : exp
      )
    );
  };

  /**
   * Delete an expense
   */
  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  /**
   * Clear all expenses
   */
  const clearAllExpenses = () => {
    if (confirm('Are you sure you want to delete all expenses? This action cannot be undone.')) {
      setExpenses([]);
    }
  };

  /**
   * Calculate statistics (memoized)
   */
  const stats: ExpenseStats = useMemo(() => calculateStats(expenses), [expenses]);

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    clearAllExpenses,
    stats,
    loading,
  };
}
